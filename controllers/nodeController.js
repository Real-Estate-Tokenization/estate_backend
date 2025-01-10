const Node = require('../models/nodeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllNodes = catchAsync(async (req, res, next) => {
  const nodes = await Node.find();

  res.status(200).json({
    status: 'success',
    results: nodes.length,
    data: {
      nodes
    }
  });
});

exports.getNode = catchAsync(async (req, res, next) => {
  const node = await Node.findById(req.params.id);

  if (!node) {
    return next(new AppError('No node found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      node
    }
  });
});

exports.updateNode = catchAsync(async (req, res, next) => {
  const node = await Node.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!node) {
    return next(new AppError('No node found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      node
    }
  });
});

exports.approveNode = catchAsync(async (req, res, next) => {
  const node = await Node.findByIdAndUpdate(
    req.params.id,
    { isApproved: true },
    {
      new: true,
      runValidators: true
    }
  );

  if (!node) {
    return next(new AppError('No node found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      node
    }
  });
});

exports.deleteNode = catchAsync(async (req, res, next) => {
  const node = await Node.findByIdAndDelete(req.params.id);

  if (!node) {
    return next(new AppError('No node found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
