const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

// GET /api/users - 获取所有用户
router.get('/', usersController.getAllUsers);

// POST /api/users - 创建新用户
router.post('/', usersController.createUser);

module.exports = router;
