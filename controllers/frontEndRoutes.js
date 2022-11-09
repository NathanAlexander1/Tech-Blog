const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../models");

router.get("/", (req, res) => {
  Blog.findAll().then((blogs) => {
    // res.json(blogs)
    const blogsHbsData = blogs.map((blog) => blog.get({ plain: true }));
    res.render("home", {
      blogs: blogsHbsData,
    });
  });
});

router.get("/blog/:id", (req, res) => {
  Blog.findByPk(req.params.id, {
    include: [User]
  }).then((blog) => {
    // res.json(blogs)
    const blogHbsData = blog.get({ plain: true });
    console.log(blog)
    console.log("===========================")
    console.log(blogHbsData)
    res.render("single-blog", blogHbsData);
  });
});

router.get("/login", (req, res) => {
    res.render("login")
})

module.exports = router;
