// app.js
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')


const app = express()

const tokenExtractor = require('./middleware/tokenExtractor')
const userExtractor = require('./middleware/userExtractor')


// 注册全局的 tokenExtractor 中间件
app.use(tokenExtractor)


// 这样，当请求 /api/blogs 路由时，先经过 tokenExtractor 将 token 提取到 request.token，然后 userExtractor 解析 token 并设置 request.user，最终控制权传递到具体的博客路由处理器中。




const blogsRouter = require('./routers/blogs')
const loginRouter = require('./routers/login')
const userRouter = require('./routers/users')



// const mongoUrl = 'mongodb://localhost/bloglist'

// 连接 MongoDB
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('✅ Connected to MongoDB'))
  .catch(error => logger.error('❌ MongoDB connection error:', error.message))

// 中间件
app.use(cors())
app.use(express.json())

// 挂载博客 API
// **这里把 blogsRouter 挂载到 /api/blogs**
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// blogsRouter 里所有的路由（router.get('/')）都会自动加上 /api/blogs 前缀。
// 也就是说，router.get('/') 变成了 GET /api/blogs。


// 处理未知端点 & 错误
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// 只导出 app，不在这里启动服务器
module.exports = app

