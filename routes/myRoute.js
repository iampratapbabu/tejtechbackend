const express = require('express');
const myController = require('../controllers/myController');

const router = express.Router();


router.route('/')
	.get(myController.getDashboard)





module.exports = router;
