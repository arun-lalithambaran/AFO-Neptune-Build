const mongoose = require('mongoose');

const statusListSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { type: Number, required: true },
    value: { type: String, required: true }
})

module.exports = mongoose.model('StatusList', statusListSchema);