// routers/login.js
const loginRouter = require('express').Router()
const loginController = require('../controllers/login')

// 当用户 POST /api/login 时，执行登录逻辑
loginRouter.post('/', loginController.login)

module.exports = loginRouter

// 1. 创建登录路由（/api/login）
// 在这个路由中，我们需要完成以下步骤：

// 验证用户身份：根据客户端提供的用户名和密码，检查数据库中是否存在该用户，并验证密码是否正确（通常用 bcrypt 进行比对）。
// 生成 JWT：如果验证通过，就使用 jsonwebtoken 库生成一个令牌。这个令牌通常包含用户的关键信息（例如 id 和 username），并使用一个密钥签名。
// 返回令牌：将生成的令牌返回给客户端，同时也可以返回用户的部分信息。


// 在路由文件中，把上述登录逻辑挂载到 /api/login 路径上。例如：


// 3. 客户端与服务器之间的交互
// 客户端发起登录请求
// 当用户在登录页面输入用户名和密码后，前端会向 /api/login 发送 POST 请求，提交用户凭据。

// 服务器验证并生成令牌
// 后端接收到请求后，通过查询数据库验证用户身份。如果身份验证成功，就生成一个 JWT，并返回给客户端。

// 客户端保存令牌
// 客户端收到令牌后，一般会将令牌保存在本地存储中（例如 localStorage 或 cookies），以便后续请求中使用。

// 后续请求带上令牌
// 当客户端需要发起需要认证的操作（例如创建或删除博客）时，会在 HTTP 请求的 Authorization 头中附加该令牌：