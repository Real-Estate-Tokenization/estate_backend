const jwt = require('jsonwebtoken');
const { promisify } = require('util');
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
    password: req.body.password
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

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token and check if it exists
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if admin still exists
  const currentAdmin = await Admin.findById(decoded.id);
  if (!currentAdmin) {
    return next(new AppError('The admin belonging to this token no longer exists.', 401));
  }

  // Grant access to protected route
  req.admin = currentAdmin;
  next();
});

exports.updateBlockchainInfo = catchAsync(async (req, res, next) => {
  // 1) Check if all required blockchain fields are provided
  const { ethAddress, vaultAddress, paymentToken, signature } = req.body;
  
  if (!ethAddress || !vaultAddress || !paymentToken || !signature) {
    return next(new AppError('Please provide all required blockchain information', 400));
  }

  // 2) Update the node with blockchain information
  const updatedNode = await Node.findByIdAndUpdate(
    req.node._id,
    {
      ethAddress,
      vaultAddress,
      ensName: req.body.ensName, // optional field
      paymentToken,
      signature
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!updatedNode) {
    return next(new AppError('No node found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      node: updatedNode
    }
  });
});

exports.nodeSignupWithBlockchain = catchAsync(async (req, res, next) => {
  // 1) Check if all required fields are provided
  const { name, email, password, ethAddress, ensName, paymentToken, autoUpdateEnabled, signature } = req.body;
  
  if (!name || !email || !password || !ethAddress || !ensName || !paymentToken || !signature) {
    return next(new AppError('Please provide all required information', 400));
  }

  // 2) Check if a node with this ethAddress already exists
  const existingNode = await Node.findOne({ ethAddress });
  if (existingNode) {
    return next(new AppError('A node operator with this wallet address already exists', 400));
  }

  // 3) Create new node with blockchain information
  const newNode = await Node.create({
    name,
    email,
    password,
    ethAddress,
    ensName,
    paymentToken,
    signature,
    autoUpdateEnabled: autoUpdateEnabled || false,
    isApproved: true // Auto-approve nodes registered with blockchain info
  });

  // 4) Generate token and send response
  createSendToken(newNode, 201, res);
});

exports.checkNodeByWalletAddress = catchAsync(async (req, res, next) => {
  const { walletAddress } = req.params;
  
  if (!walletAddress) {
    return next(new AppError('Please provide a wallet address', 400));
  }

  const node = await Node.findOne({ ethAddress: walletAddress });
  
  res.status(200).json({
    status: 'success',
    exists: !!node,
    data: node ? {
      id: node._id,
      name: node.name,
      email: node.email,
      ethAddress: node.ethAddress,
      ensName: node.ensName,
      isApproved: node.isApproved
    } : null
  });
});
