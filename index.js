const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const userRouter= require('./Routes/UresrRouter')
const Auth= require('./authMiddleware')
const cors= require('cors')
const blogRoute = require('./Routes/blogRoute')

app.use(express.json())
app.use(cors())
app.use('/blogs',Auth,blogRoute)
app.use('/users',userRouter)

app.get('/', (req,res) => {
    res.send('Welcome to blog api')
})

app.listen(process.env.PORT,async ()=>{
    console.log(`listening on port ${process.env.PORT}`)
    try {
        mongoose.connect(process.env.MONGOURL)
        console.log('connected')
        
    } catch (error) {
        console.log(`error connecting `)
    }
})