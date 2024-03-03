const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const inputController = require("../controllers/inputDataController");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, inputController.getAll)
router.get('/one/:id', authMiddleware, inputController.getOne)
router.post('/create', authMiddleware, validations.validate, inputController.create)
router.patch('/update/:id', authMiddleware, validations.validate, inputController.update)
router.delete('/delete/:id', authMiddleware, inputController.delete)
router.get('/get-input-table', authMiddleware, inputController.generateVagonTable)

module.exports = router;
 