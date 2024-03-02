const mongoose = require('mongoose');

const vagonSchema = new mongoose.Schema({
    nomer: Number,
    depo_id: Number,
    repair_type_id: Number,
    year: Number,
    vagon_type_id: String,
    owner: String,
    remain_comment: String,
    status: {
        type: Boolean,
        default: false,
    },
},{
    timestamps: true
});

const VagonModel = mongoose.model('Vagon', vagonSchema);

module.exports = VagonModel;
