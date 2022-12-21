const ProjectModel = require("../../models/Project");
const fs = require("fs")

const updateProject = async (req, res) => {
    const {number} = req.params

    try {
        const data = req.files.map((item) => item.path)
        const doc = await ProjectModel.findOneAndUpdate({project_number: number}, {
            docs: data,
            status: req.body.status
        })
        res.status(200).json(doc)
    } catch (err) {
        console.log(err)

    }

}

const removeFiles = async (req, res) => {
    const files = req.body
    const {number} = req.params
    console.log(files)

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