var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var path = require('path')
var Form = require('../model/form')


/* GET home page. */
router.get('/punjab', async function(req, res, next) {
    var forms = await Form.find({location:"Punjab"})
    res.render('index',{forms})
});

// For Your Ads
router.get('/sindh', async function(req, res, next) {
    var forms = await Form.find({location:"Sindh"})
    res.render('index',{forms})
});

router.get('/balochistan',async function(req, res, next) {
    var forms = await Form.find({location:"Balochistan"})
    res.render('index',{forms})  
});

router.get('/kpk',async function(req, res, next) {
    var forms = await Form.find({location:"KPK"})
    res.render('index',{forms})
});

router.get('/gb',async function(req, res, next) {
    var forms = await Form.find({location:"Gilgit Baltistan"})
    res.render('index',{forms})
});

router.get('/hazara',async function(req, res, next) {
    var forms = await Form.find({location:"Hazara Region"})
    res.render('index',{forms})
});

router.get('/kashmir',async function(req, res, next) {
    var forms = await Form.find({location:"Azad Kashmir"})
    res.render('index',{forms})
});

module.exports = router;
