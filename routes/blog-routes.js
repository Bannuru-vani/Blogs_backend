const router = require('express').Router();
const {
  createBlog,
  getBlogs,
  getBlog,
  getMyBlogs,
  publishBlog,
  updateBlog,
} = require('../controllers/blog-controller');
const { authRoutes } = require('../middlewares/auth');

router.route('/create').post(authRoutes, createBlog);

// router.route('/login').post(loginUser);

router.route('/all').get(getBlogs);
router.route('/myblogs').get(authRoutes, getMyBlogs);
router.route('/:id').get(getBlog).put(updateBlog);
router.route('/publish/:id').put(publishBlog);
module.exports = router;
