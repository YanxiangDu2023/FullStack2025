
// 测试4.3 Helper Functions and Unit Tests, step 1 
// tests/list_helper.test.js
const { test } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


// 引入内容：require('../utils/list_helper')

// 加载 list_helper.js 文件中导出的内容（通常是一个对象）。
// 被引入的内容赋值给变量 listHelper。

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})



// 测试4.4 Helper Functions and Unit Tests, step 2
// tests/list_helper.test.js
// 单独测试一个博客的点赞数。
// 测试多篇博客的总点赞数
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    // 这里面是所有和 "total likes" 相关的测试用例
    // describe 是 分组测试用例的工具，可以将一组相关的测试用例组织在一起，方便管理和输出。
  const listWithOneBlog = [
    // 这是测试用例的输入数据，一个包含一篇博客的数组。
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

//   test
// test 用于定义一个具体的测试用例。
// 描述：单独测试一个场景，比如 "当列表中只有一篇博客时，总点赞数应该等于这篇博客的点赞数"。

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)

//     调用 listHelper.totalLikes(listWithOneBlog)，将 listWithOneBlog 作为参数传入。
// 函数返回值 result = 5。
// 使用断言 assert.strictEqual(result, 5) 检查：
// 如果 result === 5，测试通过。
// 如果 result !== 5，测试失败，输出错误信息。

  })
})
// 测试内容是一个回调函数，包含测试逻辑。
// 使用 断言 (assert.strictEqual) 检查实际值 result 是否等于预期值 5。



// 4.5: Helper Functions and Unit Tests, step 3*
// 目标：定义 favoriteBlog 函数，返回点赞数最高的博客。
// // tests/list_helper.test.js
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  const blogs = [
    { title: 'Blog A', author: 'Author A', likes: 5 },
    { title: 'Blog B', author: 'Author B', likes: 10 },
    { title: 'Blog C', author: 'Author C', likes: 8 }
  ]

  test('finds the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[1])
  })
})
