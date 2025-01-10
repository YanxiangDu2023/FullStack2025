const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const password = process.env.MONGODB_PASSWORD;
const url = `mongodb+srv://amanda19990925:${password}@cluster0.ugz0l.mongodb.net/phonebook?retryWrites=true&w=majority`;


mongoose.connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.log('error connecting to MongoDB:', err.message));

  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: true,
    },
    number: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{2,3}-\d+$/.test(v) && v.length >= 8; // 自定义正则表达式

        //   /：正则表达式的起止符。
        //   ^：匹配字符串的开始位置。
        //   \d{2,3}：
        //   \d 表示一个数字（0-9）。
        //   {2,3} 表示匹配2到3个连续的数字。
        //   -：匹配一个连字符（-）。
        //   \d+：
        //   \d 表示一个数字。
        //   + 表示匹配1个或多个数字。
        //   $：匹配字符串的结束位置。


// /.test(v)：测试字符串 v 是否符合正则表达式的规则，返回 true 或 false。
// &&：逻辑与运算符，确保同时满足以下两个条件：
// 字符串 v 符合正则表达式。
// 字符串长度 v.length 至少为8个字符。




        },
        message: props => `${props.value} is not a valid phone number!`,
      },
    },
  });
  
  
  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

module.exports = mongoose.model('Person', personSchema);

