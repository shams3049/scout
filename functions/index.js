const functions = require("firebase-functions");
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.passwords;

//create node mailer transport
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    }
})

async function sendWelcomeEmail(email){
    const mailOptions = {
        from: 'The Agriwear project <agriwear.scout@gmail.com>',
        to: email,
        subject: 'Welcome to the Scouting Application!',
        text: 'Hey ${email}! Welcome the future of Scouting!'
    }

    await mailTransport.sendMail(mailOptions);
    console.log('New welcome email send to:', email);

    return null;
};

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    const email = user.email;
    return sendWelcomeEmail (email);
});
