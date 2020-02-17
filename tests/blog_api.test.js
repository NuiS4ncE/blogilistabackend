const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(1)
})

test('the first blog is about Test', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe('Test')
})

afterAll(() => {
    mongoose.connection.close()
})