const FormModel = require("../../models/Form.js");


const getForm = async (req, res) => {
    const form = req.body
    console.log(form)
    try {
        const formData = await new FormModel(form)
        await formData.save()
        res.status(200).send(`good for you`)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `Can't take form fields`
        })
    }
}

const updateForm = async (req, res) => {
    const form = req.body

    try {


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