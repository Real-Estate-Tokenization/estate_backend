const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.nodeSignup);
router.post('/login', authController.nodeLogin);

// Node operators can view and manage their assigned users
router.get('/users', userController.getAllUsers);
router.route('/users/:id')
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = router;
