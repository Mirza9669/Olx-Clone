var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var multer = require('multer')
var path = require('path')
var Form = require('../model/form')
var fs = require('fs');
const { func } = require('joi');
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb)=>{
        console.log(file)
        cb(null, Date.now() + file.originalname)
    }
})
var upload = multer({storage: storage})

/* GET home page. */
router.get('/', async function(req, res, next) {
  var forms = await Form.find({})
  res.render('index',{forms})
});

/* Search Bar */
router.post('/',async function(req, res, next){
  let search = req.body.search
  if(search == "car" || search == "Car" || search == "Cars") search = "cars"
  if(search == "mobile" || search == "Mobile" || search == "Mobiles") search = "mobiles"
  if(search == "plot" || search == "Plot" || search == "Plots") search = "plots"
  if(search == "motorcycle" || search == "Motorcycle" || search == "Motorcycles") search = "motorcycles"
  if(search == "tablet" || search == "Tablet" || search == "Tablets") search = "tablets"
  res.redirect(search)
})



// For Your Ads
router.get('/myads', async function(req, res, next) {
  let user = req.session.user
  var forms = await Form.find({name:user.name})
  res.render('myad',{forms})
  
});

router.get('/mobiles',async function(req, res, next) {
  var forms = await Form.find({category:'Mobile'})
  res.render('index',{forms})
});

router.get('/cars',async function(req, res, next) {
  var forms = await Form.find({category:'Cars'})
  res.render('index',{forms})
});

router.get('/plots',async function(req, res, next) {
  var forms = await Form.find({category:'Plots'})
  res.render('index',{forms})
});

router.get('/tablets',async function(req, res, next) {
  var forms = await Form.find({category:'Tablets'})
  res.render('index',{forms})
});

router.get('/motorcycles',async function(req, res, next) {
  var forms = await Form.find({category:'Motorcycle'})
  res.render('index',{forms})
});

router.get('/:id',async function(req, res, next) {
  let forms = await Form.findById(req.params.id)
  res.render('details',{forms})
   
});

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

router.get('/myads/:id',async function(req, res, next) { 
  let form = await Form.findByIdAndDelete(req.params.id)
  res.redirect('/myads')
});



module.exports = router;
