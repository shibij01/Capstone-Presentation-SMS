const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const IGToken = require("../models/token");
const IGMedia = require("../models/media");
const IGTokenTracker = require("../models/tokenTracker");
const AdminAccount = require("../models/adminAccount");
const ServicesList = require("../models/servicesList");
const nodemailer = require("nodemailer");
const Inquiry = require("../models/inquiry");
require("../routes/muaRoutes");

//Import dotenv for private info
require("dotenv").config();

exports.createInquiry = async (req, res) => {

    try {

      const inquiryType = req.body.inquiryType;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const phoneNumber = req.body.phoneNumber;
      const numberNeedingMakeup = req.body.numberNeedingMakeup;
      const eventDate = req.body.eventDate;
      const readyLocation = req.body.readyLocation;
      const venueLocation = req.body.venueLocation;
      const timeToComplete = req.body.timeToComplete;
      const needATrial = req.body.needATrial;
      const howDidYouHear = req.body.howDidYouHear;
      const detailsQuestionsNotes = req.body.detailsQuestionsNotes;

      const newInquiry = new Inquiry({
          inquiryType: inquiryType,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          numberNeedingMakeup: numberNeedingMakeup,
          eventDate: eventDate,
          readyLocation: readyLocation,
          venueLocation: venueLocation,
          timeToComplete: timeToComplete,
          needATrial: needATrial,
          howDidYouHear: howDidYouHear,
          detailsQuestionsNotes: detailsQuestionsNotes
      });
      //console.log(newInquiry)

      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'cakedbackendserver@gmail.com',
              pass: process.env.EMAIL_SERVER_PASSWORD
          }
      });

      const message = {
          from: 'cakedbackendserver@gmail.com',
          to: "shibi.john@gmail.com",
        //cakedbykim1@gmail.com
          replyTo: `${email}`,
          subject: `${inquiryType} Inquiry: ${firstName} ${lastName}`,
          html: `
              <h1>${inquiryType} Inquiry: ${firstName} ${lastName}</h1>
              <p> Email: ${email} </p>
              <p> Phone Number: ${phoneNumber} </p>
              <p> How many people will need makeup: ${numberNeedingMakeup} </p>
              <p> Event Date: ${eventDate} </p>
              <p> Ready Location: ${readyLocation} </p>
              <p> Venue Location: ${venueLocation} </p>
              <p> Time to Complete: ${timeToComplete} </p>
              <p> Do you need a Trial?: ${needATrial} </p>
              <p> How did you hear about Me?: ${howDidYouHear} </p>
              <p> Details, Questions, Notes: ${detailsQuestionsNotes} </p>
          `
      };

      transporter.sendMail(message, async function(error, info) {

            if (error) {
                console.log(error);

            } else {
                console.log(`Email sent: ${info.response}`);

            }
      })
    
    return res.status(200).json('Email Sent Successfully!')

  } catch (err) {

      return res.status(500).json('Email Not Sent Successfully!', err.message)
  }
}

// Save IG Token
exports.saveIGToken = async (req,res) => {
    const token = process.env.TOKEN;
    
    //populate values to save token
    const newIGToken = new IGToken({token: token, tokenDateEntered: Date.now(), isActive: true});

    try{
        //save new IG Token
        await newIGToken.save();
        
        //return Token saved 
        return res.status(201).json("Token Saved");        
    }
    catch (err){
        //send error response
        return res.status(500).json("Token NOT Saved!");
    }

}

//Get IG Photos
exports.getIGMedia = async (req,res) => {

    try{
        let url = '';
        const tokenFound = await IGToken.findOne({isActive: true});
        let token = tokenFound.token;
        const tokenId = tokenFound._id;
        const gotToken = tokenFound._id !== null ? true : false;
        const fieldList = 'id,media_url,media_type,timestamp,children{media_url}';
        
        if (gotToken)
        {   
            let nowDate = new Date(Date.now()), diffInMs = 0, diffInHours = 0, tokenDiffInMs = 0, tokenDiffInDays = 0, refreshTokenLimit = 1;
            //calculate difference for token
            tokenDiffInMs = nowDate.getTime() - tokenFound.tokenDateEntered.getTime();
            tokenDiffInDays = tokenDiffInMs / (1000 * 60 * 60 * 24); 
            
            //refresh Token
            if (tokenDiffInDays >= refreshTokenLimit)
            {
                url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
                
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json",
                        access_token: token
                    }
                });
                const body = await response.json();
                const newToken = body;
                token = newToken.access_token;
                await IGToken.findByIdAndUpdate({_id: tokenFound._id},{token: newToken.access_token, tokenDateEntered: nowDate, tokenDateRefreshed: nowDate});
            }
            //get IG Token Tracker 
            const currentIGTokenTracker = await IGTokenTracker.findOne({tokenId: tokenId});
            const gotTracker = currentIGTokenTracker != null ? true : false;
            
            //determine if last pull was longer than an hour
            if (gotTracker)
            {
                diffInMs = nowDate.getTime() - currentIGTokenTracker.tokenDateLastUsed.getTime();
                diffInHours = diffInMs / (1000 * 60 * 60); 
            }

            //only fetch if longer than one hour or first run for token
            if (diffInHours >= 1 || !gotTracker)
            {
                let newIGMedia;
                url = `https://graph.instagram.com/me/media?fields=${fieldList}&access_token=${token}`
                
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json",
                        access_token: token
                    }
                });
                const body = await response.json();
                const igImages = body.data;

                //save media
                for (let image of igImages)
                {
                    if (image.media_type == 'IMAGE' || image.media_type == 'CAROUSEL_ALBUM')
                    {
                        await IGMedia.findOneAndUpdate({tokenId: tokenId, mediaId: image.id}, {tokenId: tokenId, mediaId: image.id, mediaURL: image.media_url, mediaType: image.media_type, mediaTimestamp: image.timestamp, childrenURL: image.children?.data, mediaUpdatedDate: nowDate}, {upsert: true});
                    }
                }
                //update tracker
                await IGTokenTracker.findOneAndUpdate({tokenId: tokenId},{tokenDateLastUsed: nowDate}, {upsert: true});
            }

            //retrieve latest pulled images
            let lastDate = gotTracker ? currentIGTokenTracker.tokenDateLastUsed : nowDate;
            const mediaList = await IGMedia.find({tokenId: tokenId, mediaUpdatedDate: { $gte: lastDate}});

            return res.status(200).json(mediaList);
        }
        else {
            //send error response
            return res.status(403).json({message: "Token Not Found"});
        }
    }
    catch (err){
        //send error response
        return res.status(500).json("Error: getIGMedia!");
    }        
}

//Create Admin Account
exports.createAdminAccount = async (req,res) => {
    const saltRound = 10;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const username = req.body.username;
    
    //encrypt password before saving to db
    bcrypt.hash(password, saltRound, async (err, hash) => {
        
        //populate values for new admin account
        const newAdminAccount = new AdminAccount({firstName: firstName, lastName: lastName, username: username, password: hash, isActive: true});

        try{
            //save new admin account
            await newAdminAccount.save();
            // console.log(`Admin Account Created: firstName: ${firstName}, lastName: ${lastName}, username: ${username}, password: ${password}`);
            //return admin account created 
            return res.status(201).json("Admin Account Created!");        
        }
        catch (err){
            //send error response
            return res.status(500).json("Admin Account NOT Created!");
        }
        
    });
}

//Login Admin
exports.loginAdmin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //Find admin account with a matching username
    const adminFound = await AdminAccount.findOne({username: username});
    const hashedPasswordFoundAdmin = adminFound.password;
    const payload = {...req.body, adminId: adminFound._id};

    bcrypt.compare(password, hashedPasswordFoundAdmin, (err,result) => {
       
        if (result){
            // Make JWT and send response
            const signedJWT = jwt.sign(payload, process.env.ENCRYPTKEY, {expiresIn: 36000});

            return res.status(201).json({message: "Login Successful", token: signedJWT, adminId: payload.adminId, username: username, loggedIn: true});
        }
        else {
            //send error response
            return res.status(403).json({message: "Login Failed", token: null, adminId: payload.adminId, username: username, loggedIn: false});
        }
    });
}

exports.verifyToken = async (req, res) => {
    
    try{
        const authToken = req.params.id;
        const payload = authToken ? jwt.verify(authToken, process.env.ENCRYPTKEY) : undefined
        // console.log('payload:', payload);
        
        if (payload)
        {
            return res.status(201).json({message: "Token Verified", token: authToken, adminId: payload.adminId, username: payload.username, loggedIn: true});
        }   
    }
    catch (err){
        const expiredToken = err.name == 'TokenExpiredError' ? true : false;
        //send error response
        if (expiredToken) {
            return res.status(401).json({message: "Token Expired", token: null, adminId: null, username: null, loggedIn: false});
        }
        else {
            return res.status(403).json({message: "Token Not Verified", token: null, adminId: null, username: null, loggedIn: false});
        }
    }

}

//Save Services List
exports.saveServicesList = async (req,res) => {
    const servicesListNum = req.body.servicesListNum;
    const servicesListHeading = req.body.servicesListHeading;
    const servicesListDescription = req.body.servicesListDescription;
    const servicesListSubHeadings = req.body.servicesListSubHeadings;
    const servicesListType = req.body.servicesListType;
    const nowDate = Date.now();

    try{
        //save services list
        await ServicesList.findOneAndUpdate({servicesListNum: servicesListNum},{servicesListHeading: servicesListHeading, servicesListDescription: servicesListDescription, servicesListSubHeadings: servicesListSubHeadings, servicesListUpdatedDate: nowDate, servicesListType: servicesListType}, {upsert: true});
        //return status
        return res.status(201).json("Services List Saved!");        
    }
    catch (err){
        //send error response
        return res.status(500).json({message: "Services List NOT Saved!", error: err});
    }
}

exports.getServicesList = async (req,res) => {
    try{
        //save services list
        const servicesList = await ServicesList.find();

        //return admin account created 
        return res.status(201).json(servicesList);        
    }
    catch (err){
        //send error response
        return res.status(500).json({message: "Services List NOT Returned!", Error: err});
    }
}

//Delete Services List
exports.deleteServicesList = async (req,res) => {
    try{
        const servicesListNum = req.body.servicesListNum;
        //delete services list
        await ServicesList.findOneAndDelete({servicesListNum: servicesListNum});
        //return status
        return res.status(201).json("Services List Deleted!");        
    }
    catch (err){
        //send error response
        return res.status(500).json({message: "Services List NOT Deleted!", error: err});
    }
}

