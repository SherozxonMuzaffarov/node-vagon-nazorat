const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const vagonController = require("../controllers/vagonController");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, vagonController.getAll)
router.get('/one/:id', authMiddleware, vagonController.getOne)
router.post('/create', authMiddleware, validations.validate, vagonController.create)
router.patch('/update/:id', authMiddleware, validations.validate, vagonController.update)
router.delete('/delete/:id', authMiddleware, vagonController.delete)
router.get('/get-vagon-table', authMiddleware, vagonController.generateVagonTable)

module.exports = router;
 