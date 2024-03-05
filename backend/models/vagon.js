const mongoose = require('mongoose');

const vagonSchema = new mongoose.Schema({
    nomer: {
        type: Number,
        required: true,
        unique: true
    },
    vagon_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VagonType',
        required: true
    },
    repair_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RepairType',
        required: true
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    depo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Depo',
        required: true
    },
    remain_comment: {
        type: String,
    },
    status: {
        type: String,
        enum: ['remain', 'repairing', 'repaired'],
        required: true
    },
    input_data_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InputData',
        unique: true,
    },
    output_data_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OutputData',
        unique: true,
    }
},{
    timestamps: true
});

const VagonModel = mongoose.model('Vagon', vagonSchema);

module.exports = VagonModel;
