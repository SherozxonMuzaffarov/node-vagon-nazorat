const OutputData = require('../../models/outputData');
const Vagon = require('../../models/vagon');
const VagonType = require('../../models/vagonType');

const myCache = require('../../utils/nodeCache');

module.exports = {
    getAll: async (req, res) => {
        try {
            let models = await OutputData.find().populate({
                path: 'vagon_id',
                model: 'Vagon', 
                match: { status: 'repairing' },
                populate: [
                    {
                        path: 'vagon_type_id',
                        model: 'VagonType',
                        select: 'name',
                    },
                    {
                        path: 'repair_type_id',
                        model: 'RepairType',
                        select: 'name',
                    },
                ],
            });
            res.send(models);
        } catch (error) {
            console.error(error);
            res.status(500).json({ name: 'Internal Server Error' });
        }
    },
    

    getOne: async (req, res) => {
        try {
            let model = await OutputData.findById(req.params.id);

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
            let updatedModel = await Vagon.findByIdAndUpdate(
                {_id: vagon_id},
                {
                    status: 'repaired'
                },
                { new: true }
            );

            console.log("updatedModel: " + updatedModel);
            
            let model = await OutputData.create(req.body);
            
            console.log("CreatedOutput: " + model);
            res.json(model);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params; 
            console.log('Id: ' + id);    
            let updatedModel = await OutputData.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );

            if (!updatedModel) {
                return res.status(404).json({ message: 'OutputData not found' });
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

            let deletedModel = await OutputData.findByIdAndDelete(id);

            if (!deletedModel) {
                return res.status(404).json({ message: 'OutputData not found' });
            }

            res.json(deletedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
}
