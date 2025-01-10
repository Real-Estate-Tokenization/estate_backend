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
    signature: req.body.signature
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
