const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const IGToken = require("../models/token");
const IGMedia = require("../models/media");
const IGTokenTracker = require("../models/tokenTracker");
const { all } = require("../routes/muaRoutes");
const nodemailer = require("nodemailer");
//Import dotenv for private info
require("dotenv").config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cakedbackendserver@gmail.com',
        
    }
});

exports.createInquiry = async (req, res) => {

    const message = {
        from: req.body.email,
        to: "kims email",
        subject: `${req.body.inquiryType} Inquiry: ${req.body.firstName} ${req.body.lastName}`,
        html: `
            <h2> ${req.body.inquiryType} Inquiry from ${req.body.firstName} ${req.body.lastName}</h2>
            <br/>
            <p> Email: ${req.body.email} </p>
            
        `
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