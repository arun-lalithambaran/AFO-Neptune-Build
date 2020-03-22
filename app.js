const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const database_url = process.env.PROD_DATABASE_URL || 'mongodb+srv://arun32me:58515699@neptnecluster-bubxx.mongodb.net/neptune-test-base?retryWrites=true';
// mongodb+srv://arun32me:58515699@neptnecluster-bubxx.mongodb.net/test?retryWrites=true
// mongodb://localhost:27017/neptune-base?retryWrites=true
mongoose.connect(database_url,
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
const stories = require('./api/routes/stories/stories');
const publicEndpoints = require('./api/routes/publicEndpoints/publicEndpoints');

app.use(express.json());

app.use(express.static('public'));
app.use('/api/books', books);
app.use('/api/tasks', tasks);
app.use('/api/stories', stories);
app.use('/api/publicEndpoints', publicEndpoints);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Page not found!"
    })
})

module.exports = app;
