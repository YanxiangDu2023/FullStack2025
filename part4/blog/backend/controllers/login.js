// controllers/login.js
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const login = async (request, response) => {
  const { username, password } = request.body

  // 查找用户
  const user = await User.findOne({ username })
  const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  // 构造 token 载荷，包含必要的用户信息
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // 生成 JWT，密钥一般存储在环境变量中，令牌可以设置过期时间
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })

  response.status(200).send({ token, username: user.username, name: user.name })
}

module.exports = {
  login,
}
