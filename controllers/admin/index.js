const ProjectModel = require("../../models/Project");
const fs = require("fs")
const nodemailer = require("nodemailer");
const EMAIL = process.env.NODEMAILER_EMAIL
const PASS = process.env.NODEMAILER_PASS


const updateProject = async (req, res) => {
    const {number} = req.params
    try {
        const prev = await ProjectModel.findOne({project_number: Number(number)})
        const data = req.files.map((item) => item.path)
        const newArr = await prev.docs.concat(...data)
        const projectBefore = await ProjectModel.findOne({project_number: Number(number)})
        await ProjectModel.findOneAndUpdate({project_number: Number(number)}, {
            docs: newArr,
            status: req.body.status
        })
        const projectAfter = await ProjectModel.findOne({project_number: Number(number)})

        if (req.body.status !== projectBefore.status) {
            const projectAfter = await ProjectModel.findOne({project_number: Number(number)})

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
                to: `${projectAfter.customer_email}`, // list of receivers
                subject: "Xarial", // Subject line
                text: `Status of your project was changed to ${projectAfter.status}`
            });
        }


        res.status(200).send(projectAfter)
    } catch (err) {
        console.log(err)
    }

}

const removeFiles = async (req, res) => {
    const files = req.body
    const {number} = req.params

    files.forEach((file) => {
        fs.unlink(`${file}`, (err) => {
            if (err) {
                res.status(500).send({
                    message: "Could not delete the file. " + err,
                });
            }
        })
    });

    fs.readdir(`./uploads/${number}`, async (err, allFiles) => {
        if (err) {
            console.log(err)
        }
        let allMapFiles = allFiles.map(item => `uploads\\${number}\\${item}`)

        const compare = new Set(files);
        const newArr = allMapFiles.filter(e => !compare.has(e))
        await ProjectModel.findOneAndUpdate({project_number: Number(number)}, {
            docs: newArr
        })

        res.status(200)
    });


}

module.exports = {
    updateProject,
    removeFiles
}
