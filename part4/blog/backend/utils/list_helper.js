 //   4.3: Helper Functions and Unit Tests, step 1
// 目标：创建一个简单的 dummy 函数并验证测试环境是否正确。

// dummy 函数：
// 接收一个博客数组，始终返回 1。
// 功能是验证测试配置是否正常工作。

 // utils/list_helper.js
const dummy = (blogs) => {
    return 1
  }
  
  module.exports = {
    dummy
  }
  



//   4.4: Helper Functions and Unit Tests, step 2
// 目标：定义 totalLikes 函数，计算博客列表中所有点赞数的总和。

// totalLikes 函数：
// 遍历博客列表，计算每篇博客的点赞数。


// utils/list_helper.js
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }
  
  module.exports = {
    totalLikes
  }
  




// 4.5: Helper Functions and Unit Tests, step 3*
// 目标：定义 favoriteBlog 函数，返回点赞数最高的博客。

// favoriteBlog 函数：
// 遍历博客数组，找出点赞数最高的博客。
// 返回博客的简要信息（title、author 和 likes）。

// utils/list_helper.js
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    return blogs.reduce((favorite, blog) => (blog.likes > favorite.likes ? blog : favorite))
  }
  
  module.exports = {
    favoriteBlog
  }
  




//   4.6: Helper Functions and Unit Tests, step 4*
//   目标：定义 mostBlogs 函数，返回发布博客最多的作者及其博客数量。
  
//   mostBlogs 函数：
//   遍历博客数组，统计每位作者的博客数量。
//   返回博客数量最多的作者及其数量。
  
  // utils/list_helper.js
const _ = require('lodash')

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authors = _.countBy(blogs, 'author')
  const topAuthor = Object.entries(authors).reduce((top, [author, count]) => {
    return count > top.blogs ? { author, blogs: count } : top
  }, { author: null, blogs: 0 })

  return topAuthor
}

module.exports = {
  mostBlogs
}




// 4.7: Helper Functions and Unit Tests, step 5*
// 目标：定义 mostLikes 函数，返回总点赞数最高的作者。

// mostLikes 函数：
// 遍历博客数组，统计每位作者的总点赞数。
// 返回总点赞数最高的作者及点赞数。
// utils/list_helper.js
const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
  
    const authorLikes = blogs.reduce((result, blog) => {
      result[blog.author] = (result[blog.author] || 0) + blog.likes
      return result
    }, {})
  
    const topAuthor = Object.entries(authorLikes).reduce((top, [author, likes]) => {
      return likes > top.likes ? { author, likes } : top
    }, { author: null, likes: 0 })
  
    return topAuthor
  }
  
  module.exports = {
    mostLikes
  }
  