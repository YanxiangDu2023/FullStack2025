// 它是前端与后端交互的接口层。
// 封装了所有 HTTP 请求，便于管理和维护。
// 让组件代码更简洁，专注于 UI 和交互逻辑。

import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then(response => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, updatedObject) => {
  return axios.put(`${baseUrl}/${id}`, updatedObject).then(response => response.data);
};

export default { getAll, create, remove, update };
