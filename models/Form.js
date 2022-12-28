const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
    form: {
        type: Object,
    }
})

module.exports = mongoose.model('form', FormSchema)