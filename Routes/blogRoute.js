const express = require('express');
const blogRoute = express.Router();
const blogModal = require('../Schema/blog')
const userModal = require('../Schema/resgister')
const commentModal =require('../Schema/comments')

blogRoute.get('/', async (req, res) => {
    try {
        console.log('hiii')
        const { title, category, sort, order } = req.query
        let data = await blogModal.find().populate("user");
        let email = req.email

        if (title) {
            data = await data.filter((data) => data.title.toLowerCase().includes(title))
        }
        if (category) {
            data =await data.filter((data) => data.category == category)
        }
        if (sort) {
            data =await data.filter((data) => data.date == sort)
            if (order == 'asc') {
                data =await data.sort((a, b) => a.date - b.date)
            } else {
                data =await data.sort((a, b) => b.date - a.date)
            }
        }

        res.status(200).send({ blogs: data})

    } catch (error) {
        res.send(error.message)
    }
})

blogRoute.post('/', async (req, res) => {
    try {
        let blog = new blogModal(req.body)
        await blog.save()
        res.status(200).send({ data: blog, message: 'blog created successfully' })
    } catch (error) {
        res.send({ error: error.message })
    }
})

blogRoute.put('/:id', async (req, res) => {
    try {
        let blog = await blogModal.updateOne({ _id: req.params.id }, req.body)
        res.send({ message: "like updated successfully" })
    } catch (error) {
        res.send(error.message)
    }
})

blogRoute.delete('/:id', async (req, res) => {
    try {
        let blog = await blogModal.deleteOne({ _id: req.params.id })
        res.send({ message: "like deleted successfully" })
    } catch (error) {
        res.send(error.message)
    }
})
blogRoute.put('/:id/like', async (req, res) => {
    try {
        let blog = await blogModal.findOne({ _id: req.params.id })
        blog.likes++
        blog.save()
        res.send({ message: "like updated successfully" })
    } catch (error) {
        res.send(error.message)
    }
})

blogRoute.put('/:id/comment', async (req, res) => {
    try {
        let comment = new commentModal(req.body)
        await comment.save()
        res.send({ message: "comment added successfully" })
    } catch (error) {
        res.send(error.message)
    }
})

blogRoute.get('/comment', async (req, res) => {
    console.log(req.body.postId)
    try {
        let comment = await commentModal.find({"post":req.body.postId}).populate("user")
        res.send({data:comment})
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = blogRoute
