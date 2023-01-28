const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();



router.route('/')
.get(blogController.getAllBlogs)

router.route('/single/:blogid')
.get(blogController.getSingleBlog)

router.route('/myblog/:userid')
.get(blogController.getMyAllBlogs)
.post(blogController.createSingleBlog)

router.route('/myblog/:userid/:blogid')
.get(blogController.getMySingleBlog)
.patch(blogController.updateSingleBlog)
.delete(blogController.deleteSingleBlog);






module.exports = router;
