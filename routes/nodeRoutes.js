const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const nodeController = require('../controllers/nodeController');
const { protectNode } = require('../middleware/nodeAuth');

const router = express.Router();

// Public routes - no authentication needed
router.post('/signup', authController.nodeSignup);
router.post('/login', authController.nodeLogin);

// Protected routes - only accessible by approved nodes
router.get('/users', protectNode, userController.getAllUsers);
router.route('/users/:id')
  .get(protectNode, userController.getUser)
  .patch(protectNode, userController.updateUser);

// User verification routes - protected
router.patch('/users/:userId/verify', protectNode, nodeController.verifyUser);
router.patch('/users/:userId/reject', protectNode, nodeController.rejectUser);

module.exports = router;
