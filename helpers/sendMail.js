const nodemailer = require("nodemailer");

async function sendMail(email, varify, template){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: 'hgmyvjygcrhczwwn'
        }
      });
      
      
      const info = await transporter.sendMail({
        from: process.env.EMAIL, 
        to: email,
        subject: "Please Varify The Eamil", 
        html: template(varify), 
      })  
    
  }

module.exports = sendMail;