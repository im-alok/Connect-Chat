const nodemailer = require('nodemailer');

async function mailSender(email,subject,body){
    try {
        const transporter = nodemailer.createTransport({
            host:process.evv.HOST,
            auth:{
                user:process.env.USER,
                pass:process.env.PASSWORD,
            }
        })

        //send the mail
        const info = await transporter.sendMail({
            from:process.env.HOST_MAIL,
            to:email,
            subject:subject,
            body:body
        })

        console.log('mail send successfully');
    } catch (error) {
        console.log(error);
        console.log('something went wrong during sending mail');
    }
}

module.exports = mailSender;