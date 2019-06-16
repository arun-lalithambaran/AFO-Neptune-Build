const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    body: { type: String, required: true }
})

module.exports = mongoose.model('story', storySchema);