const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();


router.route('/all')
	.get(courseController.demoMiddleware,courseController.getAllCourse);

router.route('/course')
	.post(courseController.createCourse);

module.exports = router;
