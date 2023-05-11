const express = require('express');
const courseController = require('../controllers/courseController');
const authMiddle = require('../middlewares/authMiddle');

const router = express.Router();

//get and create course
router.route('/')
	.get(courseController.demoMiddleware,courseController.getAllCourse);
router.route('/create-course')
	.post(courseController.createCourse);




module.exports = router;
