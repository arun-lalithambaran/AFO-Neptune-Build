const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Story = require('../../models/stories/story');

router.get('/get', (req, res, next) => {
    Story.find()
    .select("title")
    .exec()
    .then(result => {
        res.status(200).json({
            result: result
        })
    })
    .catch(error => {
        res.status(500).json({
            error
        })
    })
})

router.get('/get/:id', (req, res, next) => {
    Story.findById(req.params.id)
    .exec()
    .then(story => {
        res.status(200).json({
            result: story
        })
    })
    .catch(error => {
        res.status(500).json({
            error
        })
    })
})

router.patch('/update/:id', (req, res, next) => {
    Story.update({_id: req.params.id}, {$set: req.body})
    .exec()
    .then(doc => {
        res.status(200).json({
            message: "Story updated succesfully.",
            result: doc
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "Failed to update story.",
            error
        })
    })
})

router.post('/save', (req, res, next) => {
    const story = new Story({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        body: req.body.body
    })

    story.save().then(result => {
        res.status(200).json({
            result: "Story saved successfully."
        })
    })
    .catch(error => {
        res.status(500).json({
            error
        })
    })
})

module.exports = router;