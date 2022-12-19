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
    const {number} = req.params
    try {
        const data = req.files.map((item) => item.path)
        await DocsModel.findOneAndUpdate({number: number}, {
            docs: data
        })
        res.status(200).json(data)
    } catch (err) {
        console.log(err)

    }

}

module.exports = {
    changeAppStatus,
    uploadsFiles
}