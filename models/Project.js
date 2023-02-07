const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    project_number: {
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
    },
    user_info: {
        type: String
    }

}, {
    timestamps: true,
})

module.exports = mongoose.model('Projects', ProjectSchema)