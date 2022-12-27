const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
    form: {
        type: Schema.Types.Mixed,
    }
})

module.exports = mongoose.model('form', FormSchema)