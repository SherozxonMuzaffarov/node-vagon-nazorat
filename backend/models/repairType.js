const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Repair', repairSchema);
