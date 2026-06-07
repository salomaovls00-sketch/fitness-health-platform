const express = require('express');
const imcController = require('../controllers/imcController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/calculate', authMiddleware, imcController.calculateIMC);
router.get('/history', authMiddleware, imcController.getIMCHistory);
router.get('/last', authMiddleware, imcController.getLastIMC);
router.get('/statistics', authMiddleware, imcController.getStatistics);

module.exports = router;