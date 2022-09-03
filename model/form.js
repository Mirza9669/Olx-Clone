var mongoose = require('mongoose')

var formSchema = mongoose.Schema({
    category:String,
    title:String,
    desc:String,
    brand:String,
    price:String,
    location:String,
    image:String,
    name:String,
    number:String,
})

const Form = mongoose.model('form',formSchema)
module.exports = Form