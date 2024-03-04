const InputData = require('../../models/inputData');
const VagonModel = require('../../models/vagon');

const myCache = require('../../utils/nodeCache');

module.exports = {
    getAll: async (req, res) => {
        try {
            let models = await InputData.find().populate({
                path: 'vagon_id',
                model: 'VagonModel',  // Replace with the actual name of your VagonModel model
                match: { status: 'repairing' },
            });
            console.log(models);
            res.send(models);
        } catch (error) {
            console.error(error);
            res.status(500).json({ name: 'Internal Server Error' });
        }
    },

    getOne: async (req, res) => {
        try {
            let model = await InputData.findById(req.params.id);

            if (!model) {
                return res.status(404).json({ message: `${req.params.id} id record not found` });
            }

            res.send(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    create: async (req, res) => {
        const { vagon_id } = req.body
        try {
            let updatedModel = await VagonModel.findByIdAndUpdate(
                {_id: vagon_id},
                {
                    status: 'repairing'
                },
                { new: true }
            );

            let model = await InputData.create(req.body);

            res.json(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                nomer,
                vagon_type_id,
                repair_type_id,
                owner_id,
                year,
                depo_id,
                remain_comment,
            } = req.body;
            
            let updatedModel = await InputData.findByIdAndUpdate(
                id,
                {
                    nomer,
                    vagon_type_id,
                    repair_type_id,
                    owner_id,
                    year,
                    depo_id,
                    remain_comment,
                    status: 'remain'
                },
                { new: true }
            );

            if (!updatedModel) {
                return res.status(404).json({ message: 'InputData not found' });
            }

            res.send(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            let deletedModel = await InputData.findByIdAndDelete(id);

            if (!deletedModel) {
                return res.status(404).json({ message: 'InputData not found' });
            }

            res.json(deletedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
}
