const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  ethAddress: {
    type: String,
    required: [true, 'Please provide an ETH address'],
    unique: true
  },
  country: {
    type: String,
    required: [true, 'Please provide a country']
  },
  state: {
    type: String,
    required: [true, 'Please provide a state']
  },
  address: {
    type: String,
    required: [true, 'Please provide an address']
  },
  kycType: {
    type: String,
    required: [true, 'Please provide KYC type']
  },
  kycId: {
    type: String,
    required: [true, 'Please provide KYC ID']
  },
  kycDocumentImage: {
    type: String
  },
  ownershipDocumentImage: {
    type: String
  },
  realEstateInfo: {
    type: String,
    required: [true, 'Please provide real estate information']
  },
  currentEstateCost: {
    type: Number,
    required: [true, 'Please provide current estate cost']
  },
  percentageToTokenize: {
    type: Number,
    required: [true, 'Please provide percentage to tokenize'],
    min: 0,
    max: 100
  },
  rewards: {
    type: Number,
    default: 0
  },
  nodeOperatorAssigned: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isRejected: {
    type: Boolean,
    default: false
  },
  signature: {
    type: String,
    required: [true, 'Please provide a signature']
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
