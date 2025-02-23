const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})


// index.js 运行服务器，加载 app.js。
// 作用：

// 启动 Express 服务器 并监听 PORT 端口。