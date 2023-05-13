const express = require('express');
const courseController = require('../controllers/courseController');
const authMiddle = require('../middlewares/authMiddle');

const router = express.Router();

//get and create course
router.route('/courses')
	.get(courseController.demoMiddleware, courseController.getAllCourse)
	.post(courseController.createCourse);


//in routes ko jinme / ya /:id type ke ho inko neche rakha jata hai
router.route('/courses/:id')    //agar id se search karna chahte hain then ise use kr skte hain
	.get(courseController.getSingleCourse)     //isme Course.findByIdAndUpdate() use krenge
	.patch(courseController.updateSingleCourse)
	.delete(courseController.deleteSingleCourse);



module.exports = router;
