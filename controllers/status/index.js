const StatusModel = require("../../models/Status.js")


const getAllStatus = async (req, res) => {
    const id = '63a9b3b8e487a1dcb3a98877'
    try {
        const statuses = await StatusModel.findById(id)
        res.status(200).json(statuses.status)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `Can't take status`
        })
    }
}
const updateStatus = async (req, res) => {
    const arr = req.body
    const id = '63a9b3b8e487a1dcb3a98877'
    try {
        await StatusModel.findOneAndUpdate({
            _id: id
        }, {
            status: arr
        })
        const statuses = await StatusModel.findById(id)
        await res.status(200).send(statuses.status)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `Can't take status`
        })
    }
}

module.exports = {
    getAllStatus,
    updateStatus
}