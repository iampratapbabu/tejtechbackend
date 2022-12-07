const express = require('express');
const myController = require('../controllers/myController');

const router = express.Router();


router.route('/')
	.get(myController.getDashboard)

router.route('/token')
	.get(myController.generateToken)





module.exports = router;
