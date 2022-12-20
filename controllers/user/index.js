const ProjectModel = require("../../models/Project");

const findDoc = async (req, res) => {

    try {
        const doc = await ProjectModel.findOne({project_number: Number(req.body.number)})
        console.log(doc)
        if (doc !== null) {
            const {status, project_number} = doc
            res.status(200).json({
                status, name: project_number
            })
        } else {
            res.status(200).json({
                message: `project number: ${req.body.number} not found`
            })

        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            massage: "failed"
        })
    }
}

module.exports = {
    findDoc
}