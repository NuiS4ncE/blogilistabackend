/* eslint-disable no-unused-vars */
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

module.exports = {
    dummy,
    totalLikes,
    maxLikes,
}
