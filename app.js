const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

mongoose.connect('mongodb+srv://arun32me:58515699@neptnecluster-bubxx.mongodb.net/neptune-base?retryWrites=true',
{ useNewUrlParser: true }
)
app.use(morgan('combined'));
app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// })

const books = require('./api/routes/books');
const tasks = require('./api/routes/tasks/task');

app.use(express.json());

app.use(express.static('public'));
app.use('/api/books', books);
app.use('/api/tasks', tasks);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Page not found!"
    })
})

module.exports = app;
