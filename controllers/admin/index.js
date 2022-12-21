const ProjectModel = require("../../models/Project");


const uploadsFiles = async (req, res) => {
    const {number} = req.params

    try {
        const data = req.files.map((item) => item.originalname)
        const doc = await ProjectModel.findOneAndUpdate({project_number: number}, {
            docs: data,
            status:req.body.status
        })
        res.status(200).json(doc)
    } catch (err) {
        console.log(err)

    }

}

module.exports = {
    uploadsFiles
}