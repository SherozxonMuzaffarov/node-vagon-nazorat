const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const vagonTypeController = require("../controllers/vagonTypeController");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, vagonTypeController.getAll)
router.get('/one/:id', authMiddleware, vagonTypeController.getOne)
router.post('/create', authMiddleware, validations.validate, vagonTypeController.create)
router.patch('/update/:id', authMiddleware, validations.validate, vagonTypeController.update)
router.delete('/delete/:id', authMiddleware, vagonTypeController.delete)

module.exports = router;
 