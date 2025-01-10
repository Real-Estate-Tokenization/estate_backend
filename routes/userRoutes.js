const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.createUser);
router.get('/profile/:id', userController.getUser);
router.patch('/profile/:id', userController.updateUser);

module.exports = router;
