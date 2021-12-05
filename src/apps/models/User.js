const mongoose = require('mongoose');
const { string } = require('yup/lib/locale');

const User = mongoose.Schema({
    id: {type:String, required: false},
    name: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
},
{ timestamps:true, }
)

module.exports = mongoose.model('user',User);