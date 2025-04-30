const mongoose = require('mongoose');

const crossChainTxnSchema = new mongoose.Schema({
  userAddress: {
    type: String,
    required: true
  },
  tokenizedRealEstateAddress: {
    type: String,
    required: true
  },
  transactionType: {
    type: String,
    enum: ["TRE_BUY", "TRE_SELL"],
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
    type: String,
  },
  ccipLink: {
    type: String
  }
}, {
  timestamps: true
});

const CrossChainTxn = mongoose.model('CrossChainTxn', crossChainTxnSchema);
module.exports = CrossChainTxn;