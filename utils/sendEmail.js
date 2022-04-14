const nodemailer = require('nodemailer');
const process = require('process');

const sendEmail = (options)=>{
    const transporter = nodemailer.createTransport({
        service: process.env.Email_Service,
        auth: {
            user: process.env.Email_Username,
            pass: process.env.Email_Password,
        },
    });
    const mailOptions = {
        from: process.env.Email_From,
        to: options.to,
        subject: options.subject,
        html: options.text,
    };
    transporter.sendMail(mailOptions, function(err, info){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(info);
        }
    });
};

module.exports = sendEmail;