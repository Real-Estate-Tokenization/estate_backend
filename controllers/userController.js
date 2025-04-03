const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    ethAddress: req.body.ethAddress,
    country: req.body.country,
    state: req.body.state,
    address: req.body.address,
    kycType: req.body.kycType,
    kycId: req.body.kycId,
    kycDocumentImage: req.body.kycDocumentImage,
    ownershipDocumentImage: req.body.ownershipDocumentImage,
    realEstateInfo: req.body.realEstateInfo,
    currentEstateCost: req.body.currentEstateCost,
    percentageToTokenize: req.body.percentageToTokenize,
    rewards: "0",
    nodeOperatorAssigned: req.body.nodeOperatorAssigned,
    isVerified: false,
    isRejected: false,
    token: req.body.token
    // signature: req.body.signature
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.getAllUsersWithFilters = catchAsync(async (req, res, next) => {
  // Build query
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);

  // Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  
  let query = User.find(JSON.parse(queryStr));

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  // Execute query
  const users = await query;

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.getUserByEthAddress = catchAsync(async (req, res, next) => {
  const { ethAddress } = req.params;

  const user = await User.findOne({ ethAddress });

  if (!user) {
    return next(new AppError('No user found with that ETH address', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.addCollateralOnEstateOwner = catchAsync(async(req, res, next) => {
  const user = await User.findOne({ ethAddress: req.params.ethAddress });
  if (!user) {
    return next(new AppError('No user found with that ETH address', 404));
  }

  const collateralDeposited = req.body.collateralDeposited + user.collateralDeposited;
  const updatedUser = await User.findByIdAndUpdate(user._id, { collateralDeposited }, {
    new: true,
    runValidators: true
  });

  if (!updatedUser) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser
    }
  });
});

exports.subtractCollateralOnEstateOwner = catchAsync(async(req, res, next) => {
  const user = await User.findOne({ ethAddress: req.params.ethAddress });
  if (!user) {
    return next(new AppError('No user found with that ETH address', 404));
  }
  
  const collateralDeposited = user.collateralDeposited - req.body.collateralWithdrawn;
  const updatedUser = await User.findByIdAndUpdate(user._id, { collateralDeposited }, {
    new: true,
    runValidators: true
  });

  if (!updatedUser) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser
    }
  });
});