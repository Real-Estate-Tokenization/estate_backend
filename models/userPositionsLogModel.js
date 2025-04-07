const mongoose = require('mongoose');

const userPositionsLogSchema = new mongoose.Schema({
  userAddress: {
    type: String,
    required: [true, 'User Eth Address is Required']
  },
  tokenizedRealEstateAddress: {
    type: String,
    required: [true, 'TRE Address is Required']
  },
  transactionType: {
    type: String,
    enum: ["COLLATERAL_DEPOSIT", "COLLATERAL_WITHDRAW", "TRE_BUY", "TRE_SELL", "REWARDS_COLLECT"],
    required: true
  },
  transactionAmount: {
    type: Number,
    required: true
  },
  transactionSymbol: {
    type: String,
    required: true
  },
  transactionHash: {
    type: String
  }
}, {
  timestamps: true
});

const UserPositionsLog = mongoose.model('UserPositionsLog', userPositionsLogSchema);
module.exports = UserPositionsLog;