const nodemailer = require('nodemailer');
require('dotenv').config();

async function mailSender(email,subject,body){
    // console.log(email);
    // console.log(body);
    try {
        const transporter = nodemailer.createTransport({
            host:process.env.HOST,
            auth:{
                user:'alokranjan.projects@gmail.com',
                pass:'ufdjvtllerrjcdka',
            }
        })

        //send the mail
        const info = await transporter.sendMail({
            from:`ConnectChat | BetaVersion - Alok Ranjan`,
            to:`${email}`,
            subject:`${subject}`,
            html:`${body}`,
        })

        console.log('mail send successfully');
    } catch (error) {
        console.log(error);
        console.log('something went wrong during sending mail');
    }
}

module.exports = mailSender;