const express = require('express');
const userController = require('../controllers/userController');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');

const router = express.Router();

router.post('/register', userController.createUser);
router.get('/profile/:id', userController.getUser);
router.patch('/profile/:id', userController.updateUser);

// New routes
router.get('/all', userController.getAllUsersWithFilters);
router.get('/eth/:ethAddress', apiKeyMiddleware, userController.getUserByEthAddress);

module.exports = router;
