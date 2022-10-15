const express = require('express');
const myController = require('../controllers/myController');

const router = express.Router();


router.route('/')
  .get(myController.demoMiddleware,myController.getAllBlogs)
  .post(myController.createBlog);

 router.route('/signup')
  .post(myController.createUser);

router.route('/login')
  .post(myController.loginUser);

  router.route('/getall')
  .get(myController.getAll);

router.route('/single/:id')
  .get(myController.getSingleBlog)
  .patch(myController.updateSingleBlog)
  .delete(myController.deleteSingleBlog);

module.exports = router;
