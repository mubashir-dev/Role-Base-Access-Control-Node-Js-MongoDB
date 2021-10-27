const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController')


router.post('/add', RoleController.create);
router.put('/edit/:id', RoleController.edit);

module.exports = router