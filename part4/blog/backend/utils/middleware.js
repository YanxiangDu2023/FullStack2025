const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
  }
  
  const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    }
    next(error)
  }
  
  module.exports = { unknownEndpoint, errorHandler }
  
// 作用：

// 处理 未知端点 请求（404）。
// 处理 全局错误（如 Mongoose 查询 ID 无效等）。
