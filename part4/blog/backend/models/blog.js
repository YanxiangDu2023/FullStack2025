// 定义 Blog Mongoose 模型，映射到 MongoDB 的 blogs 集合。
// 确保每篇博客包含 title, author, url, likes 等字段。

const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  // 添加一个字段来引用用户：指向 User 模型的 ObjectId
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }
})

// user 字段存储的是一个 MongoDB 的 ObjectId，它引用了 User 模型。
// ref: 'User' 告诉 Mongoose，这个字段关联的是 User 模型的数据。这样以后可以通过 populate 将用户的详细信息填充进来。


// 修改 toJSON 方法，转换 `_id` 为 `id`，并移除 `__v`
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
  }
})







module.exports = mongoose.model('Blog', blogSchema)
