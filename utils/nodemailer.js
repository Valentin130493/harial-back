const nodemailer = require("nodemailer");
const EMAIL = process.env.NODEMAILER_EMAIL
const PASS = process.env.NODEMAILER_PASS


let transporter = nodemailer.createTransport({
    service: "Outlook365",
    host: "smtp.office365.com",
    port: "587",
    tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
    },
    auth: {
        user: `${EMAIL}`, // generated ethereal user
        pass: `${PASS}`, // generated ethereal password
    },
});

module.exports = transporter