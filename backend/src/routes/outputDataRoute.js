const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const outputController = require("../controllers/outputDataController");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, outputController.getAll)
router.get('/one/:id', authMiddleware, outputController.getOne)
router.post('/create', authMiddleware, validations.validate, outputController.create)
router.patch('/update/:id', authMiddleware, validations.validate, outputController.update)
router.delete('/delete/:id', authMiddleware, outputController.delete)

module.exports = router;
 