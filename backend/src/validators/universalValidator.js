const Joi = require('joi')

module.exports = {
    validate: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().optional(),
            nomi: Joi.string().optional(),
            first_name: Joi.string().optional(),
            last_name: Joi.string().optional(),
            username: Joi.string().optional(),
            id: Joi.optional(),
            nomer: Joi.number().optional(),
            password: Joi.optional(),
            depo_boss_id: Joi.optional(),
            user_id: Joi.number().optional(),
            user_table_id: Joi.number().optional(),
            depo_sklad_xodim_id: Joi.optional(),
            region_id: Joi.optional(),
            phone_number: Joi.number().optional(),
            quantity: Joi.number().optional(),
            soni: Joi.number().optional(),
            price: Joi.number().optional(),
            soni: Joi.number().optional(),
            ishlabChiqarilganYili: Joi.number().optional(),
            number: Joi.number().optional(),
            depo_id: Joi.optional(),
            role: Joi.optional(),
            raqami: Joi.optional(),
            turi: Joi.optional(),
            __v: Joi.optional(),
            _id: Joi.optional(),
            vagon_type_id: Joi.optional(),
            repair_type_id: Joi.optional(),
            owner_id: Joi.optional(),
            year: Joi.optional(),
            depo_id: Joi.optional(),
            remain_comment: Joi.optional(),
            status: Joi.optional(),
            datetime: Joi.optional(),
            region: Joi.object().optional(),
            boss: Joi.object().optional(),
            sklad_xodim: Joi.object().optional(),
            createdAt: Joi.date().optional(),
            updatedAt: Joi.date().optional(),

            ramaRight1Year: Joi.number().optional(),
            ramaRight1Number: Joi.number().optional(),

            ramaRight2Year: Joi.number().optional(),
            ramaRight2Number: Joi.number().optional(),

            ramaLeft1Year: Joi.number().optional(),
            ramaLeft1Number: Joi.number().optional(),

            ramaLeft2Year: Joi.number().optional(),
            ramaLeft2Number: Joi.number().optional(),

            balka1Year: Joi.number().optional(),
            balka1Number: Joi.number().optional(),

            balka2Year: Joi.number().optional(),
            balka2Number: Joi.number().optional(),

            gildirak1: Joi.number().optional(),
            gildirak1Number: Joi.number().optional(),

            gildirak2: Joi.number().optional(),
            gildirak2Number: Joi.number().optional(),

            gildirak3: Joi.number().optional(),
            gildirak3Number: Joi.number().optional(),

            gildirak4: Joi.number().optional(),
            gildirak4Number: Joi.number().optional(),

            input_comment: Joi.optional(),
            vagon_id: Joi.optional()
            });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message})
        }
        next();
    }
}
