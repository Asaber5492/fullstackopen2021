const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')

const api = supertest(app)

const listHelper = require('../utils/list_helper')

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  afterAll(() => {
    mongoose.connection.close()
  })

  test('blogs are returned with ids', async () => {
    const blogs = await api
      .get('/api/blogs')

      expect(blogs[0]._id).toBeDefined();
  })
  
  afterAll(() => {
    mongoose.connection.close()
  })


  test('blog added', async () => {
    const newBlog = {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
        }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
  
  afterAll(() => {
    mongoose.connection.close()
  })

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

const listWithTwoBlog = [
    {
        _id: '5a533bb82c65a676234d28g9',
        title: 'Second Thing',
        author: 'Fakename T. Lastname',
        url: 'http://www.fakesite.ru/fake',
        likes: 64,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    
    test('if list empty, return 0', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)

    })

    test('if list length >2, return sum of all likes', () => {
        const result = listHelper.totalLikes(listWithTwoBlog)
        expect(result).toBe(69)
    })
})

describe('favorite blogs', () => {
    test('if list empty, return 0', () => {
        const result = listHelper.favoriteBlogs([])
        expect(result).toBe(0)
    })

    test('if list length >2, return sum of all likes', () => {
        const result = listHelper.favoriteBlogs(listWithTwoBlog).title
        expect(result).toBe('Second Thing')
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.favoriteBlogs(listWithOneBlog).title
        expect(result).toBe('Go To Statement Considered Harmful')
    })

})