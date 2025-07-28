const express = require("express");
const router = express.Router();
const upload = require("../service/upload.js");

// middleware that allows only loggedin user to post
const { authMiddleware } = require("../middleware/auth.middleware.js")


const { createBlog, getAllBlogs, getBlogById, likeBlog, unlikeBlog } = require("../controllers/blogs.controller.js")



// to add a blog
router.post("/create", authMiddleware, upload.single("coverImg"), createBlog)
router.get("/", getAllBlogs)
router.get("/:id", getBlogById)
router.put("/like/:id", authMiddleware, likeBlog)
router.put("/unlike/:id", authMiddleware, unlikeBlog)


module.exports = router;
