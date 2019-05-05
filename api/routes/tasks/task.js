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

router.get('/get/:id', (req, res, next) => {
    Task.findById(req.params.id)
    .exec()
    .then(task => {
        res.status(200).json({
            result: task
        })
    })
    .catch(error => {
        res.status(500).json({
            error
        })
    })
})

router.patch('/update/:id', (req, res, next) => {
    Task.update({_id: req.params.id}, {$set: req.body})
    .exec()
    .then(doc => {
        res.status(200).json({
            message: "Task updated succesfully.",
            result: doc
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "Failed to update task.",
            error
        })
    })
})

router.delete('/delete/:id', (req, res, next) => {
    Task.remove({_id: req.params.id})
    .exec()
    .then(doc => {
        res.status(200).json({
            message: "Task deleted succesfully.",
            result: doc
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "Failed to delete task.",
            error
        })
    })
})

router.post('/save', (req, res, next) => {

    const task = new Task({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        details: req.body.details,
        priority: req.body.priority,
        progress: req.body.progress,
        status: req.body.status,
        startDate: req.body.startDate,
        endDate: req.body.endDate
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