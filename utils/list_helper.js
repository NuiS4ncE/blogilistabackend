/* eslint-disable no-unused-vars */
const _ = require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const num = blogs.reduce((a, b) => {
        return a + b.likes
    }, 0)
    return num
}

const maxLikes = (blogs) => {
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

module.exports = {
    dummy,
    totalLikes,
    maxLikes,
    mostBlogs,
}
