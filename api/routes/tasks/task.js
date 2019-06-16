const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../../models/tasks/task');
const PriorityList = require('../../models/tasks/priority-list');
const StatusList = require('../../models/tasks/status-list');

router.get('/list', (req, res, next) => {
    const page = +req.query.page || 1;
    const perPage = +req.query.perPage || 10;
    const status = req.query.status;
    const priority = req.query.priority;
    const filter = {};
    if(status) filter['status'] = status;
    if(priority) filter['priority'] = priority;
    let data = {
        taskList: null,
        priorityList: null,
        statusList: null
    }
    Promise.all([
        Task.find(filter).skip(page == 1 ? 0 : ((page - 1 >= 0 ? page - 1 : 0) * perPage)).limit(perPage).exec(),
        PriorityList.find().exec(),
        StatusList.find().exec(),
        Task.countDocuments({}).exec(),
    ]).then(result => {
        data.taskList = {
            page: page,
            perPage: perPage,
            totalRecords: result[3],
            results: result[0]
        }
        data.priorityList = result[1];
        data.statusList = result[2];
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).json({
            error
        })
    })
})

router.get('/getSelectorData', (req, res, next) => {
    let data = {
        statusList: null,
        priorityList: null
    }
    Promise.all([
        PriorityList.find().exec(),
        StatusList.find().exec()
    ]).then(result => {
        data.priorityList = result[0];
        data.statusList = result[1];
        res.status(200).json(data);
    }).catch(error => {
        res.status(500).json({error});
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

router.get('/priorityList', (req, res, next) => {
    PriorityList.find()
    .exec()
    .then(docs => {
        res.status(200).json({
            result: docs
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "Cant get data!",
            error: error
        })
    })
})

router.get('/statusList', (req, res, next) => {
    StatusList.find()
    .exec()
    .then(docs => {
        res.status(200).json({
            result: docs
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "Cant get data!",
            error: error
        })
    })
})

// router.post('/savePriority', (req, res, next) => {
//     const priorityList = new PriorityList({
//         _id: mongoose.Types.ObjectId(),
//         id: req.body.id,
//         value: req.body.value
//     })
//     priorityList.save()
//     .then(result => {
//         res.status(200).json({
//             message: 'Got the data',
//             result: result
//         })
//     })
//     .catch(error => {
//         res.status(500).json({
//             message: "Cannot save data",
//             error: error
//         })
//     })
// })
// router.post('/saveStatus', (req, res, next) => {
//     const statusList = new NewStatusList({
//         _id: mongoose.Types.ObjectId(),
//         id: req.body.id,
//         value: req.body.value
//     })
//     statusList.save()
//     .then(result => {
//         res.status(200).json({
//             message: 'Got the data',
//             result: result
//         })
//     })
//     .catch(error => {
//         res.status(500).json({
//             message: "Cannot save data",
//             error: error
//         })
//     })
// })

module.exports = router;