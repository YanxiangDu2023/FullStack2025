// middleware/tokenExtractor.js
const tokenExtractor = (request, response, next) => {
    // 从请求头中获取 Authorization 字段
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      // 截取 token 部分，并赋值给 request.token
      request.token = authorization.substring(7)
    } else {
      request.token = null
    }
    // 调用 next() 让请求继续传递到下一个中间件或路由处理器
    next()
  }
  
  module.exports = tokenExtractor
  

// 该中间件读取请求头中的 Authorization 字段。
// 如果该字段存在且以 "Bearer " 开头，就提取出后面的 token 字符串。
// 将提取到的 token 保存到 request.token 属性上，以便后续的路由或控制器直接使用。
// 最后调用 next() 传递控制权。