const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const Node = require('../models/nodeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.adminSignup = catchAsync(async (req, res, next) => {
  const newAdmin = await Admin.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    ethAddress: req.body.ethAddress
  });

  createSendToken(newAdmin, 201, res);
});

exports.adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin || !(await admin.correctPassword(password, admin.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(admin, 200, res);
});

exports.nodeSignup = catchAsync(async (req, res, next) => {
  const newNode = await Node.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    ethAddress: req.body.ethAddress,
    vaultAddress: req.body.vaultAddress,
    ensName: req.body.ensName,
    paymentToken: req.body.paymentToken,
    signature: req.body.signature
  });

  createSendToken(newNode, 201, res);
});

exports.nodeLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const node = await Node.findOne({ email }).select('+password');

  if (!node || !(await node.correctPassword(password, node.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(node, 200, res);
});
