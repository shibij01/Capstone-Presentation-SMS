const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const IGToken = require("../models/token");
const IGMedia = require("../models/media");
const IGTokenTracker = require("../models/tokenTracker");
const { all } = require("../routes/muaRoutes");
const nodemailer = require("nodemailer");
const Inquiry = require("../models/inquiry");
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
    console.log(newInquiry)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cakedbackendserver@gmail.com',
            pass: process.env.EMAIL_SERVER_PASSWORD
        }
    });

    const message = {
        from: 'cakedbackendserver@gmail.com',
        to: "spencer.holt1214@gmail.com",
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
        const fieldList = 'id,media_url,media_type,timestamp';
        
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
                    if (image.media_type == 'IMAGE')
                    {
                        await IGMedia.findOneAndUpdate({tokenId: tokenId, mediaId: image.id}, {tokenId: tokenId, mediaId: image.id, mediaURL: image.media_url, mediaTimestamp: image.timestamp, mediaUpdatedDate: nowDate}, {upsert: true});
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