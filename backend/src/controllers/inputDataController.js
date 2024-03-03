const VagonModel = require('../../models/vagon');
const Depo = require('../../models/depos');
const VagonType = require('../../models/vagonType');
const myCache = require('../../utils/nodeCache');

module.exports = {
    getAll: async (req, res) => {
        try {
            const user = myCache.get("userData");
            let models = await VagonModel.find({status: 'remain'}).populate('depo_id', 'name').populate('vagon_type_id', 'name').populate('repair_type_id', 'name').populate('owner_id', 'name');
            res.send(models);
            // if (user.role == 'Admin') {
            // } else {
            //     let models = await VagonModel.where('depo_id').equals(user.depo_id).populate('depo_id', 'name')
            //     res.send(models);
            // }
        } catch (error) {
            console.error(error);
            res.status(500).json({ name: 'Internal Server Error' });
        }
    },

    getOne: async (req, res) => {
        try {
            let model = await VagonModel.findById(req.params.id);

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
        try {
            let {
                nomer,
                vagon_type_id,
                repair_type_id,
                owner_id,
                year,
                depo_id,
                remain_comment,
            } = req.body;

            let model = await VagonModel.create({
                nomer,
                vagon_type_id,
                repair_type_id,
                owner_id,
                year,
                depo_id,
                remain_comment,
                status: 'remain',
            });

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
            
            let updatedModel = await VagonModel.findByIdAndUpdate(
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
                return res.status(404).json({ message: 'VagonModel not found' });
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

            let deletedModel = await VagonModel.findByIdAndDelete(id);

            if (!deletedModel) {
                return res.status(404).json({ message: 'VagonModel not found' });
            }

            res.json(deletedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    generateVagonTable: async (req, res) => {
        try {
            const depoList = await Depo.find();
            const vagonTypes = await VagonType.find();
            let tableData = [['Vagon Type', 'Total']];

            depoList.forEach((depo) => {
                tableData[0].splice(-1, 0, depo.name); // Insert depo.name before the 'Total' column
            });

            // Construct the table body
            for (const vagonType of vagonTypes) {
            const row = [vagonType.name];
            let totalVagonCount = 0;

            for (const depo of depoList) {
                const vagonCount = await VagonModel.countDocuments({
                vagon_type_id: vagonType._id,
                depo_id: depo._id,
                status: 'remain'
                });

                row.push(vagonCount);
                totalVagonCount += vagonCount;
            }

            row.push(totalVagonCount);
                tableData.push(row);
            }

            console.log(tableData);

            res.json(tableData);
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }
      
};
