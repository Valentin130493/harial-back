const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
    status: {
        type: [String],

    }
})

module.exports = mongoose.model('status', StatusSchema)