const DocsModel = require("../../models/Docs");

const findDoc = async (req, res) => {

    try {
        const doc = await DocsModel.find({number: req.body.number})

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