// controllers/users.js
const bcrypt = require('bcryptjs')
const User = require('../models/user')


const getAllUsers = async (request, response, next) => {
  try {
    // 查询所有用户，并通过 populate 将每个用户对应的博客信息加载进来
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    response.json(users)
  } catch (error) {
    next(error)
  }
}


// 查询用户数据：
// User.find({}) 用于获取所有用户记录。

// populate 虚拟字段：
// .populate('blogs', { title: 1, author: 1, url: 1 }) 告诉 Mongoose：

// 查找与每个用户关联的博客记录（这里关联依据是在用户模型中定义的虚拟字段 blogs）。
// 只返回每篇博客的 title、author 和 url 字段，这样可以减少不必要的数据传输。
// 结果是，每个用户对象中都会多出一个 blogs 数组，包含该用户创建的所有博客信息。


const createUser = async (request, response) => {
  const { username, password, name } = request.body

  if (!username || !password || !name) {
    return response.status(400).json({ error: 'Username, password, and name are required' })
  }

 
 
 
  // 检查用户名是否已存在
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: 'Username must be unique' })
  }

  // 哈希密码
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // 创建用户并保存
  const user = new User({
    username,
    passwordHash,
    name,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
}





module.exports = { createUser , getAllUsers }
