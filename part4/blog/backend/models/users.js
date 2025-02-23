// models/user.js
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  passwordHash: { type: String, required: true },
})

// 设置虚拟字段，用来表示该用户所创建的博客
userSchema.virtual('blogs', {
  ref: 'Blog',
  foreignField: 'user', // Blog 模型中引用用户的字段名
  localField: '_id'
})

// 虚拟字段 blogs：
// userSchema.virtual('blogs', { ... }) 定义了一个虚拟属性 blogs，它不是实际存储在数据库中的字段，而是在查询时动态生成的。

// ref: 'Blog'：表示关联的模型是 Blog 模型。
// foreignField: 'user'：在 Blog 模型中，字段 user 用于存储引用用户的 ObjectId。
// localField: '_id'：在 User 模型中，使用当前用户的 _id 与 Blog 的 user 字段进行匹配。
// 结果是，每个用户对象在通过 populate 查询时，会自动附加一个 blogs 数组，包含所有与该用户关联的博客。






userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
