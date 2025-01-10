const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const nodeController = require('../controllers/nodeController');

const router = express.Router();

router.post('/signup', authController.adminSignup);
router.post('/login', authController.adminLogin);

// User management routes
router.route('/users')
  .get(userController.getAllUsers);

router.route('/users/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// Node management routes
router.route('/nodes')
  .get(nodeController.getAllNodes);

router.route('/nodes/:id')
  .get(nodeController.getNode)
  .patch(nodeController.updateNode)
  .delete(nodeController.deleteNode);

router.patch('/nodes/:id/approve', nodeController.approveNode);

module.exports = router;
