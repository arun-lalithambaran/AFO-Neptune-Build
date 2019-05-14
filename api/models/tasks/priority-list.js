const mongoose = require('mongoose');

const priorityListSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { type: Number, required: true },
    value: { type: String, required: true }
})

module.exports = mongoose.model('PriorityList', priorityListSchema);