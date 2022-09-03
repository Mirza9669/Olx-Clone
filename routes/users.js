var express = require('express');
const User = require('../model/user');
var router = express.Router();
const checkSessionAuth = require('../middleware/checkSessionAuth');
const sessionAuth = require('../middleware/sessionAuth');
var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
const config = require('config') 
var path = require('path')
var Form = require('../model/form')

router.get('/signup',async function(req, res, next) {
  res.render('user/signup');
});

router.get('/logout',function(req, res, next) {
  req.session.user = null
  res.redirect("/users/login")
});


router.get('/login',async function(req, res, next) {
    res.render('user/login');
});

router.post('/login',async function(req, res, next) {
  let user = await User.findOne({email:req.body.email})
  if(!user) return res.redirect("/users/login")
  let isValid = await bcrypt.compare(req.body.password, user.password)
  if(!isValid) return res.redirect("/users/login")
  req.session.user = user
  console.log(req.session.user) 
  return res.redirect('/')
});

router.post('/signup',async function(req, res, next) {
  let user = await User.findOne({email:req.body.email})
  if (user)
  return res.status(400).send("User with given Email already exists")
  user = new User(req.body)
  let salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  await user.save()
  res.redirect('/')
});

module.exports = router;
