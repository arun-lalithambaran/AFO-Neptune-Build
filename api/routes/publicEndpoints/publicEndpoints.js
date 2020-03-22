const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/covidStatus', (req, res, next) => {
    let url = 'https://english.mathrubhumi.com/stat/corona/viruscases.json';
    fetch(url).then((data) => data.json()).then((dataJson) => {
        res.status(200).json(dataJson);
    }).catch((err) => {
        res.status(500).json({ status: false, error: err });
    })
})

module.exports = router;