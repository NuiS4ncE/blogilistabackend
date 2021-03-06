/* eslint-disable no-unused-vars */
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1, id: 1 })
    console.log(blogs)
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = Blog.findById(request.params.id)
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})


blogsRouter.post('/', async (req, res, next) => {
    const body = req.body
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        url: body.url,
        title: body.title,
        author: body.author,
        user: user._id,
        likes: body.likes
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const userid = user.id
    if (blog.user.toString() === userid.toString()) {
        try {
            await Blog.findByIdAndRemove(req.params.id)
            res.status(204).end()
        } catch (exception) {
            next(exception)
        }
    } else {
        res.status(400).json({ error: 'id doesnt match' })
    }
})

blogsRouter.put('/:id', (req, res, next) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        .then(updatedBlog => {
            res.json(updatedBlog.toJSON())
        })
        .catch(error => next(error))
})

module.exports = blogsRouter