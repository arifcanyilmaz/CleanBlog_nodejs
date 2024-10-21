const Blog = require("../models/Blog"); //photo modelimizi import ettik.

exports.getAllPosts = async (req, res) => {
  const page = req.query.page || 1;
  const postsPerPage = 3;
  const totalPosts = await Blog.find({}).countDocuments();
  const blogItem = await Blog.find({})
  .sort("-dateCreated")
  .skip((page-1)*postsPerPage)
  .limit(postsPerPage)

  res.render("index", {
    blogItem: blogItem,
    current: page,
    pages: Math.ceil(totalPosts / postsPerPage)
  });
};

exports.getPost = async (req, res) => {
  const postBlogItem = await Blog.findById(req.params.id);
  res.render("post", {
    postBlogItem,
  });
};

exports.createPost = async (req, res) => {
  await Blog.create(req.body);
  res.redirect("/");
};

exports.updatePost = async (req, res) => {
  const postBlogItem = await Blog.findByIdAndUpdate({ _id: req.params.id });
  postBlogItem.title = req.body.title;
  postBlogItem.description = req.body.description;
  postBlogItem.save();
  res.redirect(`/post/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  const postBlogItem = await Blog.findByIdAndDelete({ _id: req.params.id });
  res.redirect("/");
};
