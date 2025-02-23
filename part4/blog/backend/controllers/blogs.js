const Blog = require('../models/blog');
const jwt = require('jsonwebtoken')
const User = require('../models/user')




// 获取所有博客
const getAllBlogs = async (request, response, next) => {
  try {
    // 查询所有博客，并用 populate 将 blog.user 中的 ObjectId 替换为用户信息（只包含 username 和 name）
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
}

// .populate('user', { username: 1, name: 1 }) 的作用是告诉 Mongoose：

// 对于每个博客中的 user 字段（该字段保存的是用户的 ObjectId），自动查找并填充对应的用户信息。
// 只选择用户对象中的 username 和 name 字段（1 表示包含该字段），其他字段（例如密码散列）则不会被返回。
// 这样，返回的每个博客对象中，不再仅仅包含一个用户 ID，而是包含一个详细的用户对象。前端在展示博客列表时，就能直接看到每篇博客对应的创建者的用户名和姓名。





const createBlog = async (request, response, next) => {
  try {
    // 如果没有 token，则返回错误
    const token = request.token
    if (!token) {
      return response.status(401).json({ error: 'token missing' })
    }
    
    // 验证 token，有效时返回解析后的 payload
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    
    // 根据 token 中的用户 id 查找对应的用户
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(401).json({ error: 'user not found' })
    }
    
    // 继续创建博客
    const blogData = {
      ...request.body,
      user: user._id  // 将通过 token 得到的用户设置为博客的创建者
    }
    const blog = new Blog(blogData)
    const savedBlog = await blog.save()

    // 可选：更新用户的博客列表（如果需要记录用户创建的博客）
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
}





// 删除博客
const deleteBlog = async (request, response, next) => {
  try {
    // 通过 tokenExtractor 和 userExtractor 中间件，request.user 应该已经被设置
    // 在删除操作前，通过之前的中间件（比如 userExtractor）已经把解析后的用户对象放在了 request.user 中。如果没有用户信息，就说明请求没有提供有效的令牌，返回 401 状态。
    const user = request.user
    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    // 获取要删除的博客
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    // 注意：blog.user 可能是一个对象，需要转换成字符串进行比较
    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'only the creator can delete the blog' })
    }

    // 如果用户匹配，允许删除
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
}

// 用户点击删除按钮时，前端会发起带有删除目标博客 ID 的 DELETE 请求，同时在请求头中包含 Authorization: Bearer <token>。
// 后端在接收到请求后，通过中间件提取并解析 token，将对应用户信息设置到 request.user。
// 删除操作中，后端根据 token 中的用户信息与博客中存储的创建者信息进行比对，只有匹配时才允许删除。


// 验证请求的身份：通过之前的中间件，确保 request.user 已经包含经过 token 解析的当前用户信息。
// 查找要删除的博客：根据请求路径中的 ID 获取博客记录，并检查其是否存在。
// 权限检查：比较博客记录中的 user 字段与当前请求用户的 ID，只有两者相等时才能进行删除操作。
// 执行删除：权限验证通过后，调用 Mongoose 方法删除博客，并返回 204 状态码表示操作成功。








// 更新博客（仅更新 likes）
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { likes } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Updating blog failed' });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
};
