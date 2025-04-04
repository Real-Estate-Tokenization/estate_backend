const express = require('express');
const userController = require('../controllers/userController');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');

const router = express.Router();

router.post('/register', userController.createUser);
router.get('/profile/:id', apiKeyMiddleware, userController.getUser);
router.patch('/update/:id', apiKeyMiddleware, userController.updateUser);
router.patch('/addCollateralOnEstateOwner/:ethAddress', apiKeyMiddleware, userController.addCollateralOnEstateOwner);
router.patch('/subtractCollateralOnEstateOwner/:ethAddress', apiKeyMiddleware, userController.subtractCollateralOnEstateOwner);

// tokenized position upsert route
router.post('/upsert-tokenized-position', apiKeyMiddleware, userController.upsertTokenizedPosition)
router.get('/get-all-user-tokenized-position', apiKeyMiddleware, userController.getAllUserTokenizedPosition);
router.get('/get-user-tokenized-position', apiKeyMiddleware, userController.getUserTokenizedPosition);

// New routes
router.get('/all',apiKeyMiddleware , userController.getAllUsersWithFilters);
router.get('/eth/:ethAddress', apiKeyMiddleware, userController.getUserByEthAddress);

module.exports = router;
