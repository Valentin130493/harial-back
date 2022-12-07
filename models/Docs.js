const mongoose = require("mongoose");

const DocsSchema = new mongoose.Schema({
    number: {
        type: Number,
        require: true,
        unique: true
    },
    status: {
        type: String,
        require: true
    },
    docs: {
        type: Array,
    }

}, {
    timestamps: true,
})

module.exports = mongoose.model('Docs', DocsSchema)