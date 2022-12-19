const DocsModel = require("../../models/Docs");
const nodemailer = require("nodemailer");
const {createTable} = require('../../utils/createTable')
const {login} = require("../auth");
const EMAIL = process.env.NODEMAILER_EMAIL
const PASS = process.env.NODEMAILER_PASS

const formData = async (req, res) => {
    try {
        const formData = req.body
        const copyValue = req.body.copy
        console.log(typeof copyValue)
        let RandomNumber = Math.floor(Math.random() * 900) + 1000;

        const doc = new DocsModel({
            number: RandomNumber,
            status: "pending",
            docs: []
        });

        const newDoc = await doc.save()

        console.log(newDoc)

        try {


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


            let info = await transporter.sendMail({
                from: `${EMAIL}`, // sender address
                to: `${EMAIL}`, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
            });


            if (copyValue === "true") {

                const table = createTable(formData)
                let infoWithFormData = await transporter.sendMail({
                    from: `${EMAIL}`, // sender address
                    to: `${EMAIL}`, // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: table
                });
            }


        } catch (err) {
            console.log(err)
        }


        res.status(200).json(newDoc)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Сталася дурня'
        })
    }
}

const findByNumber = async (req, res) => {
    try {
        const doc = await DocsModel.findOne({number: req.body.number})

        res.status(200).json({
            doc
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Number is not valid, try again'
        })
    }
}



module.exports = {
    formData,
    findByNumber
}