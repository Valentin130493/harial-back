const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    project_number: {
        type: Number,
        require: true,
        unique: true
    },
    customer_name: {
        type: String,
    },
    customer_email: {
        type: String,
    },
    customer_company: {
        type: String,
    },
    customer_country: {
        type: String,
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