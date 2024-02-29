const mongoose = require('mongoose');

const vagonSchema = new mongoose.Schema({
    nomer: Number,
    depoNomi: String,
    remontTuri: String,
    ishlabChiqarilganYili: Number,
    vagonTuri: String,
    izoh: String,
    country: String,
    createdDate: String,
    status: {
        type: Boolean,
        default: false,
    },
});

const VagonModel = mongoose.model('Vagon', vagonSchema);

module.exports = VagonModel;
