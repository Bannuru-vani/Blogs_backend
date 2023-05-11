const router = require('express').Router();
const {
  createBlog,
  getBlogs,
  getBlog,
  getMyBlogs,
  publishBlog,
  updateBlog,
  deleteBlog,
  addAClapBlog,
  addALikeBlog,
} = require('../controllers/blog-controller');
const { authRoutes } = require('../middlewares/auth');

router.route('/create').post(authRoutes, createBlog);

// router.route('/login').post(loginUser);

router.route('/all').get(getBlogs);
router.route('/myblogs').get(authRoutes, getMyBlogs);
router
  .route('/:id')
  .get(getBlog)
  .put(authRoutes, updateBlog)
  .delete(authRoutes, deleteBlog);
router.route('/publish/:id').put(publishBlog);
router.route('/clap/:id').put(addAClapBlog);
router.route('/like/:id').put(authRoutes, addALikeBlog);
module.exports = router;
