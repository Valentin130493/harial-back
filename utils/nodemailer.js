const nodemailer = require("nodemailer");
const EMAIL = process.env.NODEMAILER_EMAIL
const PASS = process.env.NODEMAILER_PASS


let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: `${EMAIL}`, // generated ethereal user
        pass: `${PASS}`, // generated ethereal password
    },
});

module.exports = transporter