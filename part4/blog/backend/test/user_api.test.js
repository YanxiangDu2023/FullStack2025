
// 为了确保验证逻辑正确，需要编写测试来验证以下情况：

// 缺少 username 或 password 时：请求应返回 400 错误，并包含相应错误提示。
// username 或 password 长度不足 3 个字符：请求应返回 400 错误。
// 重复的 username：如果已存在相同用户名，创建用户时也应返回 400 错误。


// tests/user_api.test.js
const supertest = require('supertest')

// supertest：用于模拟 HTTP 请求，从而测试我们的 API 接口。


const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('User creation validation', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

//   使用 beforeEach 钩子清空数据库中所有用户数据，确保每个测试都是在一个干净的环境下执行的。

  test('fails if username is missing', async () => {
    const newUser = {
      name: 'Test User',
      password: 'password123'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('username and password are required')
  })

//   目的：验证当请求中缺少 username 字段时，API 返回 400 状态码，并给出明确错误提示。
// 实现：
// 构造一个只包含 name 和 password 的请求数据。
// 发送 POST 请求到 /api/users。
// 期望响应状态码为 400（表示客户端错误）。
// 检查响应体中的错误信息是否包含“username and password are required”。






  test('fails if username is shorter than 3 characters', async () => {
    const newUser = {
      username: 'ab',
      name: 'Test User',
      password: 'password123'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('at least 3 characters')
  })

//   目的：确保当 username 的字符数不足 3 个时，API 能正确返回错误。
//   实现：
//   构造一个 username 长度不足 3 的请求数据（例如 'ab'）。
//   发送 POST 请求，并期望返回 400 状态码。
//   验证返回的错误消息中是否包含“at least 3 characters”的提示。






  test('fails if password is shorter than 3 characters', async () => {
    const newUser = {
      username: 'validUsername',
      name: 'Test User',
      password: 'pw'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('at least 3 characters')
  })

//   目的：确保当密码长度不足 3 个字符时，API 返回错误。
//   实现：
//   构造一个密码只有 2 个字符的用户数据。
//   发送请求后期望状态码为 400。
//   检查错误消息中是否包含“at least 3 characters”。




  test('fails if username is not unique', async () => {
    const newUser = {
      username: 'uniqueUser',
      name: 'Test User',
      password: 'password123'
    }

    // 首次创建应成功
    await api.post('/api/users').send(newUser).expect(201)

    // 重复的用户名应返回错误
    const duplicateUser = {
      username: 'uniqueUser',
      name: 'Another User',
      password: 'anotherPassword'
    }

    const result = await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)

    expect(result.body.error).toContain('username must be unique')
  })
})

// 目的：验证如果尝试创建重复的用户名，API 应返回错误，确保用户名的唯一性。
// 实现：
// 首先创建一个新用户（预期成功返回 201 状态码）。
// 然后构造一个与之前相同 username 的新用户请求。
// 发送第二个 POST 请求，期望返回 400 状态码。
// 检查返回错误信息是否包含“username must be unique”。
