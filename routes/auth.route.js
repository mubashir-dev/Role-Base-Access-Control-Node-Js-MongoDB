const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController')


router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/', AuthController.index);
router.get('/:id', AuthController.find);
router.put('/edit/user/:id', AuthController.edit);
router.put('/update', AuthController.update);
router.put('/changePassword', AuthController.changePassword);

module.exports = router