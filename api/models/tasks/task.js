const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    priority: { type: String, required: true},
    details: { type: String, required: true},
    progress: { type: Number, default: 0},
    status: { type: String, required: true},
    startDate: { type: String, default: new Date()},
    endDate: { type: String, required: false}
})

module.exports = mongoose.model('Task', taskSchema);