const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const repairTypeController = require("../controllers/repairTypeController");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, repairTypeController.getAll)
router.get('/one/:id', authMiddleware, repairTypeController.getOne)
router.post('/create', authMiddleware, validations.validate, repairTypeController.create)
router.patch('/update/:id', authMiddleware, validations.validate, repairTypeController.update)
router.delete('/delete/:id', authMiddleware, repairTypeController.delete)

module.exports = router;
 