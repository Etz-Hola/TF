const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  contactPerson: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: String,
  phoneNumber: String,
  password: {
    type: String,
    required: true
  },
  transportationType: {
    type: String,
    enum: ['Train', 'Bus'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  isCompany: {
    type: Boolean,
    default: true
  }

});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
