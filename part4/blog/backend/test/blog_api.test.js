const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')  // 引入 Express 应用
const api = supertest(app)  // 通过 SuperTest 进行 API 测试
const Blog = require('../models/blog')  // 引入 Mongoose Blog 模型
const usersRouter = require('./routes/users')


// 在测试代码中，api.get('/api/blogs') 之所以能正确调用 controller 里的 GET /api/blogs 端点，是因为 Express 应用 (app.js) 已经注册了 /api/blogs 这个路由。我们来拆解一下为什么是这个路径//


// 测试前清空数据库，并插入初始博客数据
beforeEach(async () => {
    await Blog.deleteMany({})  // 清空数据库

    const initialBlogs = [
        { title: "Blog1", author: "Alice", url: "http://blog1.com", likes: 5 },
        { title: "Blog2", author: "Bob", url: "http://blog2.com", likes: 3 }
    ]

    await Blog.insertMany(initialBlogs)  // 插入数据
})

// 测试 GET /api/blogs 是否返回正确的 JSON 数据
test('blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')  // 发送 GET 请求
        .expect(200)  // 期望状态码 200
        .expect('Content-Type', /application\/json/)  // 期望响应格式为 JSON

    expect(response.body).toHaveLength(2)  // 期望返回 2 篇博客
})

// 4.9
// 写一个测试 来验证 API 返回的博客数据中的标识符字段应命名为 id，而不是 _id
// 修改 Mongoose 模型，在 toJSON() 方法中转换 _id 为 id，并移除 __v 字段。
test('blog posts have an id field instead of _id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()  // 确保 id 存在
        expect(blog._id).toBeUndefined()  // 确保 _id 被移除
    })
})



// 4.10

// 编写一个测试，验证向 /api/blogs 发送 POST 请求能够成功创建新的博客文章。
// 确保新博客成功存入数据库，并且博客总数增加 1。
// 确保博客内容正确地保存到数据库。
// 让 /api/blogs 端点使用 async/await 处理 POST 请求。

test('a valid blog post can be added', async () => {
    const newBlog = {
        title: 'New Blog Post',
        author: 'John Doe',
        url: 'http://newblog.com',
        likes: 7
    }

    // 先获取初始数据库中的博客数量
    const blogsAtStart = await api.get('/api/blogs')

    // 发送 POST 请求，添加新博客
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)  // 期望返回状态码 201 Created
        .expect('Content-Type', /application\/json/)

    // 发送 GET 请求，获取最新的博客列表
    const blogsAtEnd = await api.get('/api/blogs')

    // 验证博客数量增加 1
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length + 1)

    // 验证新博客的内容正确存入数据库
    const titles = blogsAtEnd.body.map(blog => blog.title)
    expect(titles).toContain('New Blog Post')
})



// 4.11: Blog List Tests, step 4 解析
// 测试目标：验证如果 POST /api/blogs 请求中 缺少 likes 字段，则默认 likes 值应为 0。
// 修改代码：确保 Blog 模型在 likes 字段缺失时，默认设为 0。

test('if likes is missing, it defaults to 0', async () => {
    const newBlog = {
        title: 'Blog Without Likes',
        author: 'Jane Doe',
        url: 'http://nolikes.com'
    }

    // 发送 POST 请求，创建新博客
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)  // 确保返回状态码 201 Created
        .expect('Content-Type', /application\/json/)

    // 验证 likes 字段默认值为 0
    expect(response.body.likes).toBe(0)
})


// 4.12: Blog List Tests, step 5 解析
// 任务目标
// 测试目标：
// 当 POST /api/blogs 请求中 缺少 title 或 url 时，应该返回 400 Bad Request 状态码。
// 修改代码：
// 确保 title 和 url 都是必填字段，否则返回 400。

test('blog without title is not added', async () => {
    const newBlog = {
        author: 'Author Without Title',
        url: 'http://notitle.com',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)  // 确保返回 400 Bad Request

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body.length).toBe(initialBlogs.length) // 确保数量未增加
})

test('blog without url is not added', async () => {
    const newBlog = {
        title: 'Blog Without URL',
        author: 'Author Without URL',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)  // 确保返回 400 Bad Request

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body.length).toBe(initialBlogs.length) // 确保数量未增加
})




// ✅ 测试成功删除博客
test('a blog can be deleted', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204) // 期望返回204 No Content
  
    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })
  
  // ✅ 测试删除不存在的博客时返回 404
  test('deleting a non-existing blog returns 404', async () => {
    const nonExistingId = new mongoose.Types.ObjectId()
  
    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .expect(404) // 期望返回 404 Not Found
  })


// 4.14: 测试更新博客 likes
test('successfully updates the likes of a blog', async () => {
    // 先获取数据库里现有的博客

    const blogsAtStart = await Blog.find({})

    const blogToUpdate = blogsAtStart[0] // 取第一个博客

     // 获取数据库里的博客列表，选第一个博客 blogToUpdate 进行测试。




    // 发送 PUT 请求更新 likes
    const updatedLikes = { likes: 20 }
    const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedLikes)
        .expect(200) // 期望状态码 200 OK
        .expect('Content-Type', /application\/json/)

        // 向 /api/blogs/:id 发送 PUT 请求，请求体只包含 likes。
        // 期待响应码 200，并且 Content-Type 必须是 JSON

    // 验证 likes 是否更新成功
    expect(response.body.likes).toBe(updatedLikes.likes)
})







// 测试完成后关闭数据库连接
afterAll(() => {
    mongoose.connection.close()
})
