// 作用：读取 .env 中的环境变量（如 MongoDB URI）。
// 避免把敏感信息硬编码到项目中。

require('dotenv').config()

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 3003
}
