const info = (...params) => console.log(...params)
const error = (...params) => console.error(...params)

module.exports = { info, error }

// 作用：统一管理日志输出，方便调试和错误跟踪。