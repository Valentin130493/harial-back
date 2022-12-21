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
                let infoWithFormData = await transporter.sendMail({
                    from: `${EMAIL}`, // sender address
                    to: `${EMAIL}`, // list of receivers
                    subject: "Xarial", // Subject line
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", // plain text body
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
        console.log(doc)
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