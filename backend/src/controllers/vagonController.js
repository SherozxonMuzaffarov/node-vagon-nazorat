const VagonModel = require('../../models/vagon');
const myCache = require('../../utils/nodeCache')

module.exports = {
    getAll: async (req, res) => {
        try {
            const user = myCache.get("userData");
            let models = await VagonModel.find({}).populate('depo_id', 'name').populate('vagon_type_id', 'name').populate('repair_type_id', 'name').populate('owner_id', 'name');
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

    generateVagonTable: async(req, res) =>{
        try {
            const result = await VagonModel.aggregate([
                {
                    $group: {
                        _id: {
                            depo_id: "$depo_id",
                            vagon_type_id: "$vagon_type_id",
                        },
                        count: { $sum: 1 },
                    },
                },
                {
                    $group: {
                        _id: "$_id.depo_id",
                        vagon_types: {
                            $push: {
                                vagon_type_id: "$_id.vagon_type_id",
                                count: "$count",
                            },
                        },
                    },
                },
                {
                    $lookup: {
                        from: "depos", // Use the actual name of the 'Depo' collection
                        localField: "_id",
                        foreignField: "_id",
                        as: "depo_data",
                    },
                },
                {
                    $unwind: "$depo_data",
                },
                {
                    $project: {
                        depo_name: "$depo_data.name",
                        vagon_types: 1,
                    },
                },
                {
                    $sort: { depo_name: 1 }, // Optional: Sort the result based on depo_name
                },
            ]);
            
            // Print or use the result as needed
            console.log(result);
            
        res.json(result);

        } catch (error) {
          console.error('Error:', error);
        }
      }
};
