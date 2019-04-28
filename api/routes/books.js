const express = require('express');
const route = express.Router();

route.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Book list"
    })
})

route.post('/save', (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    message: "Book saved successfully",
    body: req.body
  })
})

module.exports = route;
