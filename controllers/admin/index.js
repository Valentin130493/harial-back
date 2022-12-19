const DocsModel = require("../../models/Docs");

const changeAppStatus = async (req, res) => {
    const {number, status} = req.body
    try {
        const doc = await DocsModel.findOneAndUpdate({number: number}, {
            status: status
        })
        res.status(200).send(doc.status)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            massage: "failed"
        })
    }
}

const uploadsFiles = async (req, res) => {
    console.log(req.files)
}

module.exports = {
    changeAppStatus,
    uploadsFiles
}