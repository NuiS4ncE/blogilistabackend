/* eslint-disable no-unused-vars */
const _ = require('lodash')
const supertest = require('supertest')
const Blog = require('../models/blog')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const num = blogs.reduce((a, b) => {
        return a + b.likes
    }, 0)
    return num
}

const favoriteBlog = (blogs) => {
    const maxnum = Math.max.apply(Math, blogs.map((a) => {
        return a.likes
    }))
    const blog = blogs.find((b) => {
        return b.likes === maxnum
    })
    const newBlog = new Object({
        title: blog.title,
        author: blog.author,
        likes: blog.likes
    })
    return newBlog
}

const mostBlogs = (blogs) => {
    const countAuthor = _.map(_.countBy(blogs, 'author'), (val, key) =>
        ({ author: key, blogs: val }))
    const maxAuthor = Math.max.apply(Math, countAuthor.map((b) => {
        return b.blogs
    }))
    const returnBlog = countAuthor.find((c) => {
        return c.blogs === maxAuthor
    })
    return returnBlog
}

const mostLikes = (blogs) => {
    const mapAuthor = blogs.map(blog => {
        const obj = new Object({
            author: blog.author,
            likes: blog.likes
        })
        return obj
    })
    const sumAuthor = _(mapAuthor).groupBy('author').map((val, key) => ({
        'author': key,
        'likes': _.sumBy(val, 'likes')
    }))
        .value()
    const maxLikes = Math.max.apply(Math, sumAuthor.map((b) => {
        return b.likes
    }))
    const returnBlog = sumAuthor.find((c) => {
        return c.likes === maxLikes
    })
    return returnBlog
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    blogsInDb,
}
