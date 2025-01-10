const express = require('express');
const app = express();

const morgan = require('morgan');
const path = require('path');

// 提供静态文件
app.use(express.static(path.join(__dirname, 'dist')));

// 对于未匹配的路由，返回前端的 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 3.11：将前端生产版本集成到后端，实现完整的全栈应用。



// 使用 morgan，配置为 'tiny' 格式
app.use(morgan('tiny'));
// morgan('tiny') 是一种日志格式，会输出简洁的日志信息，例如：
// GET /api/persons 200 7.000 ms - 123


morgan.token('body', (req) => JSON.stringify(req.body)); // 定义自定义 token 'body'

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);


const Person = require('./models/person'); // 引入 Mongoose 模型

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons); // 将从数据库获取的人员数据发送给客户端
    })
    .catch(error => {
      console.error('Error fetching persons:', error.message);
      res.status(500).send({ error: 'Failed to fetch persons' });
    });
});


// res.json() 是 Express 中的一个方法，用来将数据转换为 JSON 格式并发送到客户端。
// 在这里，persons 是一个数组，包含预定义的电话簿数据

// app.get('/api/persons', (req, res) => {
//   res.json(persons);
// });


// // 这使得服务器在本地 3001 端口上监听请求。
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(count => {
      const currentTime = new Date();
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${currentTime}</p>
      `);
    })
    .catch(error => next(error));
});


  
  app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
      .then(person => {
        if (person) {
          res.json(person);
        } else {
          res.status(404).send({ error: 'Person not found' });
        }
      })
      .catch(error => {
        console.error('Error fetching person:', error.message);
        res.status(500).send({ error: 'Failed to fetch person' });
      });
  });
  


  app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body;
  
    const updatedPerson = { name, number };
  
    Person.findByIdAndUpdate(req.params.id, updatedPerson, { new: true, runValidators: true, context: 'query' })
      .then(updatedPerson => {
        res.json(updatedPerson);
      })
      .catch(error => next(error));
  });
  


  

  app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(204).end(); // 删除成功，返回 204 无内容
      })
      .catch(error => {
        console.error('Error deleting person:', error.message);
        res.status(500).send({ error: 'Failed to delete person' });
      });
  });
  
  


  app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;
  
    if (!name || !number) {
      return res.status(400).json({ error: 'name or number is missing' });
    }
  
    const person = new Person({ name, number });
  
    person.save()
      .then(savedPerson => {
        res.status(201).json(savedPerson); // 将保存成功的数据返回给客户端
      })
      .catch(error => {
        console.error('Error saving person:', error.message);
        res.status(500).send({ error: 'Failed to save person' });
      });
  });
  
  
// 启动后端服务器

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// 是的，经过 3.13 - 3.18 的改进，现在所有的 API 都从数据库中获取或更新数据。