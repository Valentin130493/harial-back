const DocsModel = require("../../models/Docs");

const changeAppStatus = async (req, res) => {

    try {
        const doc = await DocsModel.findOneAndUpdate({status: req.body.status})

    } catch (err) {
        console.log(err)
        res.status(500).json({
            massage: "failed"
        })
    }
}