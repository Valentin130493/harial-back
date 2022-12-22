const ProjectModel = require("../../models/Project");
const nodemailer = require("nodemailer");
const {createTable} = require('../../utils/createTable')
const EMAIL = process.env.NODEMAILER_EMAIL
const PASS = process.env.NODEMAILER_PASS

const formData = async (req, res) => {
    try {
        const formData = req.body
        const copyValue = req.body.copy
        const table = createTable(formData)
        let RandomNumber = Math.floor(Math.random() * 9000) + 100000;

        const doc = new ProjectModel({
            project_number: RandomNumber,
            customer_name: req.body.name,
            customer_company: req.body.company,
            customer_country: req.body.country,
            status: "Request Received",
            docs: [],
            user_info :table
        });

        const newDoc = await doc.save()

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


            await transporter.sendMail({
                from: `${EMAIL}`, // sender address
                to: `${EMAIL}`, // list of receivers
                subject: "Xarial", // Subject line
                text: `Form was submitted from this email address - ${req.body.email}`
            });

            await transporter.sendMail({
                from: `${EMAIL}`, // sender address
                to: `${req.body.email}`, // list of receivers
                subject: "Xarial", // Subject line
                text: `Your project number is ${newDoc.project_number}`
            });


            if (copyValue === "true") {

                const table = createTable(formData)
                await transporter.sendMail({
                    from: `${EMAIL}`, // sender address
                    to: `${req.body.email}`, // list of receivers
                    subject: "Xarial", // Subject line
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
const getAllProjects = async (req, res) => {
    try {
        const docs = await ProjectModel.find()
        res.status(200).send(docs)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Server error'
        })
    }
}

const findByNumber = async (req, res) => {
    const {number} = req.params
    console.log(number)
    try {
        const doc = await ProjectModel.findOne({project_number: Number(number)})

        res.status(200).send(doc)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Number is not valid, try again'
        })
    }
}


module.exports = {
    formData,
    findByNumber,
    getAllProjects
}