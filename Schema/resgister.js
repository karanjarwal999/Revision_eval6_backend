const mongoose = require('mongoose')

const registerSchema= mongoose.Schema({
    username:{type:"string", required:true},
    avtar:{type:"string", required:true},
    email:{type:"string", required:true},
    password:{type:"string", required:true},
})

module.exports = mongoose.model('user',registerSchema)