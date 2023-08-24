const express = require('express')
const userRouter = express.Router()
const userModel = require('../Schema/resgister')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userRouter.post('/signup', async (req, res) => {
    const userExists = await userModel.findOne({ email: req.body.email })
    if (userExists) {
        res.send('email already exists')
    }
    req.body.password = await bcrypt.hash(req.body.password, 8)
    const user = await userModel.create(req.body)
    res.status(200).send('Account created successfully')
})

userRouter.post('/login', async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user) {
        let password = await bcrypt.compare(req.body.password, user.password)
        if (password) {
            let token = jwt.sign({ 'email': user.email }, process.env.JWTCODE)
            res.send({ message: 'login successful', token: token, userId:user._id })
        } else {
            res.send({ message: 'invalid password' })
        }
    } else {
        res.send({ message: 'Email not found' })
    }
})

module.exports = userRouter