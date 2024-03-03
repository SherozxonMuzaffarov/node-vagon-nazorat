const mongoose = require('mongoose');

const outputDataSchema = new mongoose.Schema({
  vagon_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vagon',
    required: true
  },
  ramaRight1Year: Number,
  ramaRight1Number: Number,

  ramaRight2Year: Number,
  ramaRight2Number: Number,

  ramaLeft1Year: Number,
  ramaLeft1Number: Number,

  ramaLeft2Year: Number,
  ramaLeft2Number: Number,

  balka1Year: Number,
  balka1Number: Number,

  balka2Year: Number,
  balka2Number: Number,

  gildirak1: Number,
  gildirak1Number: Number,

  gildirak2: Number,
  gildirak2Number: Number,

  gildirak3: Number,
  gildirak3Number: Number,

  gildirak4: Number,
  gildirak4Number: Number,

  output_comment: {
    type: String,
  },
},{
  timestamps: true
});

const OutputData = mongoose.model('OutputData', outputDataSchema);

module.exports = OutputData;
