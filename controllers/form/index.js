const DocsModel = require("../../models/Docs");
const nodemailer = require("nodemailer");
const {createTable} = require('../../utils/createTable')
const EMAIL = process.env.NODEMAILER_EMAIL
const PASS = process.env.NODEMAILER_PASS

const formData = async (req, res) => {
    try {
    const formData = req.body

    // let RandomNumber = Math.floor(Math.random() * 900) + 1000;
    //
    // const doc = new DocsModel({
    //     number: RandomNumber,
    //     status: "pending",
    //     docs: []
    // });
    //
    // const newDoc = doc.save()

    const table = createTable(formData)

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
        //
        // let info = await transporter.sendMail({
        //     from: `${EMAIL}`, // sender address
        //     to: `${EMAIL}`, // list of receivers
        //     subject: "Hello ✔", // Subject line
        //     text: "Hello world?", // plain text body
        // });
        //
        // let infoWithFormData = await transporter.sendMail({
        //     from: `${EMAIL}`, // sender address
        //     to: `${EMAIL}`, // list of receivers
        //     subject: "Hello ✔", // Subject line
        //     text: "Hello world?", // plain text body
        //     html: "<b>Hello world 12312321321</b>" +
        //         "<h1>test</h1>", // html body
        // });
    } catch (err) {
        console.log(err)
    }




        res.status(200).json(req.body)

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