const express = require('express');
const blogController = require('../controllers/blogs');

const router = express.Router();

// 获取所有博客
router.get('/', blogController.getAllBlogs);

// 创建新博客
router.post('/', blogController.createBlog);

// 删除博客
router.delete('/:id', blogController.deleteBlog);

// 更新博客
router.put('/:id', blogController.updateBlog);

module.exports = router;
