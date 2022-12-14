const DocsModel = require("../../models/Docs");

const findDoc = async (req, res) => {

    try {
        const doc = await DocsModel.findOne({number: Number(req.body.number)})

        if (doc !== null) {
            const {status, number} = doc
            res.status(200).json({
                status, name: number
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