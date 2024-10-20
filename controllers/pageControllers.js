const Blog = require("../models/Blog"); //photo modelimizi import ettik.

exports.getAboutPage = (req, res) => {
  res.render("about");
};

exports.getAddPage = (req, res) => {
  res.render("add_post");
};

exports.getEditPostPage = async (req, res) => {
  const postBlogItem = await Blog.findById({ _id: req.params.id });
  res.render("edit", {
    postBlogItem,
  });
};
