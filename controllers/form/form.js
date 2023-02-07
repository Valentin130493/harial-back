const FormModel = require("../../models/Form.js");


const getForm = async (req, res) => {
    const id = "63ac74bce7b44bf0af24f0dd"
    try {
        const formData = await FormModel.findById(id)
        res.status(200).send(formData.form)
    } catch (err) {
        res.status(500).json({
            message: `Can't take form fields`
        })
    }
}

const updateForm = async (req, res) => {
    const form = req.body
    const id = "63ac74bce7b44bf0af24f0dd"
    try {
        await FormModel.findOneAndUpdate({
            _id: id
        }, {
            form
        })

        const fromData = await FormModel.findById(id)
        res.status(200).send(fromData.form)

    } catch (err) {
        res.status(500).json({
            message: `Can't take form fields`
        })
    }
}

module.exports = {
    getForm,
    updateForm
}