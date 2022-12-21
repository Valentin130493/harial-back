const ProjectModel = require("../../models/Project");
const fs = require("fs")

const updateProject = async (req, res) => {
    const {number} = req.params
    console.log(req.body.files)
    try {
        const data = req.files.map((item) => item.path)
        await ProjectModel.findOneAndUpdate({project_number: Number(number)}, {
            docs: data,
            status: req.body.status
        })
        const project = await ProjectModel.findOne({project_number: Number(number)})
        console.log(project)
        res.status(200).send(project)
    } catch (err) {
        console.log(err)
    }

}

const removeFiles = async (req, res) => {
    const files = req.body
    const {number} = req.params

    await files.forEach((file) => {
        fs.unlink(`${file}`, (err) => {
            if (err) {
                res.status(500).send({
                    message: "Could not delete the file. " + err,
                });
            }
        })


    });
    fs.readdir(`/upload/${number}`, async (err, allFiles) => {
        await ProjectModel.findOneAndUpdate({project_number: number}, {
            docs: allFiles
        })
    });


    res.status(200).send({
        message: "ok",
    });

}

module.exports = {
    updateProject,
    removeFiles
}