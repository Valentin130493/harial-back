const ProjectModel = require("../../models/Project");
const nodemailer = require("nodemailer");
const {createTable} = require('../../utils/createTable')
const {login} = require("../auth");
const EMAIL = process.env.NODEMAILER_EMAIL
const PASS = process.env.NODEMAILER_PASS

const formData = async (req, res) => {
    try {
        const formData = req.body
        const copyValue = req.body.copy

        let RandomNumber = Math.floor(Math.random() * 9000) + 100000;

        const doc = new ProjectModel({
            project_number: RandomNumber,
            customer_name: req.body.name,
            customer_company: req.body.company,
            customer_country: req.body.country,
            status: "Request Received",
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


        res.status(200)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Server error'
        })
    }
}

const findByNumber = async (req, res) => {
    try {
        const doc = await ProjectModel.findOne({project_number: req.body.number})

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