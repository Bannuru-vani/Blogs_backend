const Blog = require('../models/Blog');
const asyncHandler = require('../middlewares/asyncHandler');
const httpError = require('../utils/httpError');

//#region ~ POST - /api/v1/blog/create - Create Blog - PRIVATE -
exports.createBlog = asyncHandler(async (req, res, next) => {
  let { title, subTitle, author, tags, category, content } = req.body;
  author = req.user._id;
  console.log({ title, subTitle, author, tags, category, content });
  const blog = await Blog.create({
    title,
    subTitle,
    author,
    tags,
    category,
    content,
  });
  return res.status(201).json({ message: `${title} is added to Draft` });
});
//#endregion

//#region ~ PUT - /api/v1/blog/:id - Update Blog - PRIVATE -
exports.updateBlog = asyncHandler(async (req, res, next) => {
  let { title, subTitle, author, tags, category, content } = req.body;
  let { id } = req.params;
  author = req.user._id;
  console.log({ title, subTitle, author, tags, category, content });
  const blog = await Blog.findByIdAndUpdate(id, {
    title,
    subTitle,
    author,
    tags,
    category,
    content,
  });
  return res.status(200).json({ message: `${title} is updated!` });
});
//#endregion

//#region ~ PUT - /api/v1/blog/publish/:id - Publish the Blog - PRIVATE -
exports.publishBlog = asyncHandler(async (req, res, next) => {
  let { id } = req.params;

  const blog = await Blog.findByIdAndUpdate(id, {
    stage: 'publish',
  });
  return res.status(200).json({ message: `${blog.title} Published!` });
});
//#endregion

//#region ~ GET - /api/v1/blog/all - GET all Blog - PUBLIC -
exports.getBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find();
  return res.status(200).json({ blogs });
});
//#endregion

//#region ~ GET - /api/v1/blog/:id - GET a Blog - PUBLIC -
exports.getBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  return res.status(200).json(blog);
});
//#endregion

//#region ~ GET - /api/v1/blog/myblogs - GET all user Blogs - PRIVATE -
exports.getMyBlogs = asyncHandler(async (req, res, next) => {
  let author = req.user._id;
  const blogs = await Blog.find({ author });
  return res.status(200).json(blogs);
});
//#endregion
