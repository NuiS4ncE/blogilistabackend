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

module.exports = {
    dummy,
    totalLikes,
}
