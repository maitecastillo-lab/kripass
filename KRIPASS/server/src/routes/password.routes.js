const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/password.controller');
const encryptMiddleware = require('../middlewares/authMiddleware');

router.get('/', passwordController.getPasswords);
router.post('/', encryptMiddleware, passwordController.createPassword);
router.put('/:id', encryptMiddleware, passwordController.updatePassword); // 👈 NUEVO
router.delete('/:id', passwordController.deletePassword);

module.exports = router;