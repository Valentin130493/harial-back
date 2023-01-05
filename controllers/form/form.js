const FormModel = require("../../models/Form.js");


const getForm = async (req, res) => {
    const id = "63ac74bce7b44bf0af24f0dd"
    try {
        const formData = await FormModel.findById(id)
        res.status(200).send(formData.form)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `Can't take form fields`
        })
    }
}

const updateForm = async (req, res) => {
    const form = req.body
    console.log(req.body)
    const id = "63ac74bce7b44bf0af24f0dd"
    try {
        await FormModel.findOneAndUpdate({
            _id: id
        }, {
            form: form
        })
        const formData = await FormModel.findById(id)
        await res.status(200).send(formData.form)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `Can't take form fields`
        })
    }
}

module.exports = {
    getForm,
    updateForm
}