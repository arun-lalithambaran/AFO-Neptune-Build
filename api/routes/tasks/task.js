const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../../models/tasks/task');

router.get('/list', (req, res, next) => {
    Task.find()
    .exec()
    .then(docs => {
        res.status(200).json({
            result: docs
        })
    })
    .catch(error => {
        res.status(500).json({
            error
        })
    })
})

router.post('/save', (req, res, next) => {

    const task = new Task({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        details: req.body.details
    })
    task.save().then(result => {
        res.status(200).json({
            message: 'Task saved successfully.',
            result: result
        })
    }).catch(error => {
        res.status(500).json({
            message: 'Failed to save task!',
            error: error
        })
    })
})

module.exports = router;