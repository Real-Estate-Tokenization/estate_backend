const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const nodeController = require('../controllers/nodeController');
const { protectNode } = require('../middleware/nodeAuth');

const router = express.Router();

// Public routes - no authentication needed
router.post('/signup', authController.nodeSignup);
router.post('/login', authController.nodeLogin);
router.post('/update-node/:id', protectNode, nodeController.updateNode)
router.post('/blockchain-signup', authController.nodeSignupWithBlockchain);
router.get('/check/:walletAddress', authController.checkNodeByWalletAddress);

// Protected routes - requires authentication
router.patch('/update-blockchain-info', protectNode, authController.updateBlockchainInfo);

// Protected routes - only accessible by approved nodes
router.get('/users', protectNode, userController.getAllUsers);
router.get('/filtered-users', protectNode, userController.getAllUsersWithFilters);
router.route('/users/:id')
  .get(protectNode, userController.getUser)
  .patch(protectNode, userController.updateUser);

// User verification routes - protected
router.patch('/users/:userId/verify', protectNode, nodeController.verifyUser);
router.patch('/users/:userId/reject', protectNode, nodeController.rejectUser);

module.exports = router;
