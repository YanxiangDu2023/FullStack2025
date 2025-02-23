const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
  try {
    const token = request.token
    if (!token) {
      return response.status(401).json({ error: 'token missing' })
    }

    // 提取 token：从 request.token 中获取 token。如果没有 token，则返回 401 错误。
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    // 使用 jwt.verify 对 token 进行验证，如果 token 无效或解析后的 payload 中没有用户 id，则返回 401。
    
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(401).json({ error: 'user not found' })
    }
    // 根据 token 中的 id，通过 User.findById 查找对应的用户对象。如果找不到用户，同样返回 401 错误。
    
    // 将查找到的用户挂载到 request 对象上
    request.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = userExtractor
