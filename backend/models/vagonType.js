const mongoose = require('mongoose');

const vagonTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('VagonType', vagonTypeSchema);
