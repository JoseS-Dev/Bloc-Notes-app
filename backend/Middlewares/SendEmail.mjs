import {createTransport} from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create options for the emial transporter
const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

// Create the middlware for the send email
export const sendEmail = (req, res, next) => {
    const emailOptions = {
        from: process.env.EMAIL_USER,
        to: req.body.email_user,
        subject: 'Bloc Notes - Registration',
        html: `
        <h1>Welcome to bloc Notes ${req.body.name_user}</h1>
        <p>This Bloc Notes is a simple app that allows you to create, edit and delete notes.</p>
        <p>You can also create categories to organize your notes.</p>
        <p>We hope you enjoy using our app!</p>
        <p>If you have any questions, feel free to contact us at any time.</p>
        <br>
        <div>
            <p>Best regards,</p>
            <p>Jose Santana</p>
            <p>Developer of Bloc Notes</p>
            <p>Email: ${process.env.EMAIL_USER}</p>
        </div>
        `
    }

    // Send the email
    transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({message: 'Error sending email'});
        } else {
            console.log('Email sent: ' + info.response);
            next();
        }
    })
}