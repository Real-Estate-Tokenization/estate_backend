const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const nodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  ethAddress: {
    type: String,
    required: false
  },
  vaultAddress: {
    type: String,
    required: false
  },
  ensName: {
    type: String,
    required: false
  },
  paymentToken: {
    type: String,
    required: false
  },
  signature: {
    type: String,
    required: false
  },
  isApproved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password before saving
nodeSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to check if password is correct
nodeSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Node = mongoose.model('Node', nodeSchema);
module.exports = Node;
