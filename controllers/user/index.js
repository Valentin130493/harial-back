const DocsModel = require("../../models/Docs");

const findDoc = async (req, res) => {

    try {
        const doc = await DocsModel.find({number: req.body.number})

        const {status} = doc

        res.status(200).json({
            app_status: status
        })

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