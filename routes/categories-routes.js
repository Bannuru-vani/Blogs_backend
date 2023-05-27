const {
  getCategories,
  updateSlug,
  getBlogsByCategoriesId,
} = require('../controllers/categories-controller')

const router = require('express').Router()

router.route('/all').get(getCategories)
router.route('/:id').put(updateSlug)
router.route('/:id/blog').get(getBlogsByCategoriesId)
module.exports = router
