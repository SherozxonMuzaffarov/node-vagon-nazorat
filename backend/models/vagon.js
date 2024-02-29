const mongoose = require('mongoose');

const vagonSchema = new mongoose.Schema({
    nomer: Number,
    depo_id: Number,
    repair_type: Number,
    year: Number,
    vagon_type: String,
    remain_comment: String,
    owner: String,
    status: {
        type: Boolean,
        default: false,
    },
});

const VagonModel = mongoose.model('Vagon', vagonSchema);

module.exports = VagonModel;
