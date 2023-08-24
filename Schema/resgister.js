const mongoose = require('mongoose')

const registerSchema= mongoose.Schema({
    email:{type:"string", required:true},
    password:{type:"string", required:true},
})

module.exports = mongoose.model('user',registerSchema)