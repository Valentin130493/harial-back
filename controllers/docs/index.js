const ProjectModel = require("../../models/Project");
const {createTable} = require('../../utils/createTable')
const EMAIL = process.env.NODEMAILER_EMAIL
const transporter = require("../../utils/nodemailer")

const formData = async (req, res) => {
    try {
        const formData = req.body
        const copyValue = req.body.copy
        const table = createTable(formData)
        let RandomNumber = Math.floor(Math.random() * 9000) + 100000;

        const doc = new ProjectModel({
            project_number: RandomNumber,
            status: "Request Received",
            docs: [],
            user_info: table
        });

        const newDoc = await doc.save()

        try {

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
            res.status(500).json({
                message: 'Letter could not send',
            });
        }


        res.status(200)

    } catch (err) {
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
        res.status(500).json({
            message: 'Server error'
        })
    }
}

const findByNumber = async (req, res) => {
    const {number} = req.params
    try {
        const doc = await ProjectModel.findOne({project_number: Number(number)})
        res.status(200).send(doc)
    } catch (err) {
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