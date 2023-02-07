const ProjectModel = require("../../models/Project");

const findDoc = async (req, res) => {
    try {
        const doc = await ProjectModel.findOne({project_number: Number(req.body.number)})

        if (doc !== null) {
            res.status(200).json(doc)
        } else {
            res.status(200).json({
                message: `project number: ${req.body.number} not found`
            })
        }
    } catch (err) {
        res.status(500).json({
            massage: "failed"
        })
    }
}

module.exports = {
    findDoc
}