const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})


describe('total likes again', () => {
    const blogs = [
        {
            _id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422b891b54a676234d17fa',
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            likes: 10, __v: 0
        },
        {
            _id: '5a422ba71b54a676234d17fb',
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422bc61b54a676234d17fc',
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 2,
            __v: 0
        }
    ]
    test('count all likes', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('max likes and blogs', () => {
    const blogs = [
        {
            _id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422b891b54a676234d17fa',
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            likes: 10, __v: 0
        },
        {
            _id: '5a422ba71b54a676234d17fb',
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422bc61b54a676234d17fc',
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 2,
            __v: 0
        }
    ]
    const ablog = blogs.find((l) => {
        return l.likes === 12
    })
    const theblog = new Object({
        title: ablog.title,
        author: ablog.author,
        likes: ablog.likes
    })
    test('when list has a blog that equals the max likes of that', () => {
        const result = listHelper.maxLikes(blogs)
        expect(result).toStrictEqual(theblog)
    })

    const rcmBlog = new Object({
        author: 'Robert C. Martin',
        blogs: 3
    })
    test('when list has an author that equals the max entries', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(rcmBlog)
    })

    const ewdBlog = new Object({
        author: 'Edsger W. Dijkstra',
        likes: 17
    })
    test('when list has an author that equals the max total likes', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(ewdBlog)
    })
})

describe('checks', () => {
    const blog =
    {
        _id: '23142',
        title: 'The great test',
        author: 'Tester Testerson',
        url: 'test.test',
        likes: 69,
        __v: 0
    }
    /*test('check id doesnt have underscore', () => {
        const result = listHelper.checkID(blog)
        expect(result).toEqual('id')
    })*/

    test('check that you can post with HTTP POST',async () => {
        await api
            .post('/api/blogs')
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)
        expect(contents[1]).toEqual('The great test')
    })
})