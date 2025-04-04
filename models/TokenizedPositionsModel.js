const mongoose = require('mongoose');

const userTokenizedPositionSchema = new mongoose.Schema({
  userAddress: {
    type: String,
    // unique: true,
    required: [true, 'User Eth Address is Required']
  },
  tokenizedRealEstateAddress: {
    type: String,
    required: [true, 'TRE Address is Required']
  },
  collateralDeposited: {
    type: Number,
    default: 0
  },
  treMinted: {
    type: Number,
    default: 0
  },
  rewardsCollected: {
    type: Number,
    default: 0
  },
  paymentToken: {
    type: Number,
    default: 0
  },
  paymentTokenSymbol: {
    type: String
  }
}, {
  timestamps: true
});

const UserTokenizedPosition = mongoose.model('UserTokenizedPosition', userTokenizedPositionSchema);
module.exports = UserTokenizedPosition;