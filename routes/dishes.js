const express = require('express');
const dishController = require('../controllers/dishes');

const router = express.Router();

// router.post('/', dishController.createDish);
router.post('/', dishController.createDish);
router.get('/', dishController.getListOfDishes);

module.exports = router;
