const InputData = require('../../models/inputData');
const Vagon = require('../../models/vagon');
const VagonType = require('../../models/vagonType');

const myCache = require('../../utils/nodeCache');


module.exports = {
    getAll: async (req, res) => {
        try {
            let models = await InputData.find().populate({
                path: 'vagon_id',
                model: 'Vagon',
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
            
            // models = models.filter((item) => item.vagon_id.status == 'repairing')
            
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
            let updatedModel = await Vagon.findByIdAndUpdate(
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
            console.log('Id: ' + id);    
            let updatedModel = await InputData.findByIdAndUpdate(
                id,
                req.body,
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
