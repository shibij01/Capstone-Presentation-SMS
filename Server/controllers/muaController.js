const nodemailer = require("nodemailer");

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