/* eslint-disable no-unused-vars */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs.map(blog => blog.toJSON()))
  })
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (req, res, next) => {
  const body = req.body

  const blog = new Blog({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  blog.save()
    .then(savedBlog => {
      res.json(savedBlog.toJSON())
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const blog = {
    title: String,
    author: String,
    url: String,
    likes: Number
  }

  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then(updatedBlog => {
      res.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter