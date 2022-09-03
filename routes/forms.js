var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var multer = require('multer')
var path = require('path')
var fs = require('fs')
var checkSessionAuth = require('../middleware/checkSessionAuth')
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb)=>{
        console.log(file)
        cb(null, file.originalname)
    }
})
var upload = multer({storage: storage})

var Form = require('../model/form')
/* GET home page. */
router.get('/',checkSessionAuth, function(req, res, next) {
  res.render('form');
});

router.get('/index', async function(req, res, next) {
  var forms = await Form.find({})
  res.render('index',{forms})
});


router.post('/',upload.single('image'), async (req, res, next)=>{
  var form = new Form({
    category:req.body.category,
    title:req.body.title,
    desc:req.body.desc,
    brand:req.body.brand,
    price:req.body.price,
    location:req.body.location,
    image:req.file.filename,
    name:req.body.name,
    number:req.body.number,
  })
  await form.save()
  console.log(form)
  res.redirect('/')
})

router.get('/:id',async function(req, res, next) {
  let form = await Form.findById(req.params.id)
  res.render('formEdit',{form})
   
});

router.post('/:id',upload.single('image'),async function(req, res, next) {
  let form = await Form.findById(req.params.id)
  form.category=req.body.category
  form.title=req.body.title,
  form.desc=req.body.desc,
  form.brand=req.body.brand,
  form.price=req.body.price,
  form.location=req.body.location,
  form.image=req.file.filename,
  form.name=req.body.name,
  form.number=req.body.number,
  await form.save()
  res.redirect("/myads");
});


module.exports = router;