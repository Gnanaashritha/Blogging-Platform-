const mongoose = require("mongoose");
const User = require("../models/user.model.js")
const Blog = require("../models/blog.model.js")

const cloudinary = require("../service/cloudinary.js")


const createBlog = async (req, res) => {
    try {
        const { title, description, content } = req.body;
        if (!title?.trim()) return res.status(400).json({ error: "Title is required" });
        if (title.trim().length > 200) return res.status(400).json({ error: "Title too long" });

        if (!description?.trim()) return res.status(400).json({ error: "Description is required" });
        if (description.trim().length > 500) return res.status(400).json({ error: "Description too long" });

        if (!content?.trim()) return res.status(400).json({ error: "Content is required" });
        if (content.trim().length > 50000) return res.status(400).json({ error: "Content too long" });

        if (!req.file) return res.status(400).json({ error: "Cover image is required" });

        const coverImg = req.file;
        const maxFileSize = 5 * 1024 * 1024;
        if (coverImg.size > maxFileSize) {
            return res.status(400).json({ error: "Image exceeds 5MB limit" });
        }

        const base64Image = `data:${coverImg.mimetype};base64,${coverImg.buffer.toString("base64")}`;

        let coverImgSrc;
        try {
            const uploadRes = await cloudinary.uploader.upload(base64Image, { folder: "blogs" });
            coverImgSrc = uploadRes.secure_url;
        } catch (uploadError) {
            console.error("Cloudinary error:", uploadError);
            return res.status(500).json({ error: "Image upload failed" });
        }

        const blog = await Blog.create({
            title: title.trim(),
            description: description.trim(),
            content: content.trim(),
            coverImg: coverImgSrc,
            author: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Blog created",
            blog,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        if (page < 1 || limit < 1 || limit > 50) {
            return res.status(400).json({ success: false, error: "Invalid pagination params" });
        }

        let filter = {};

        // Handle filtering by author
        if (req.query.author) {
            if (req.query.author === "me") {
                if (!req?.user?.id) {
                    return res.status(401).json({ success: false, error: "Unauthorized" });
                }
                filter.author = req.user.id;
            } else if (mongoose.Types.ObjectId.isValid(req.query.author)) {
                filter.author = req.query.author;
            } else {
                return res.status(400).json({ success: false, error: "Invalid author ID" });
            }
        }

        const totalBlogs = await Blog.countDocuments(filter);
        const totalPages = Math.ceil(totalBlogs / limit);

        const blogs = await Blog.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select("-content -likedBy")
            .lean();

        res.status(200).json({
            success: true,
            blogs,
            pagination: {
                currentPage: page,
                totalPages,
                totalBlogs,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });
    } catch (error) {
        console.error("Fetch blogs error:", error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
};

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid blog ID" });
        }

        const blog = await Blog.findById(id)
            .select("-likedBy")
            .lean();

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        res.status(200).json({ message: "Blog fetched", blog });
    } catch (error) {
        console.error("Get blog error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid blog ID" });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (req.user.id !== blog.author.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this blog" });
        }

        await blog.deleteOne();

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Delete blog error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const editBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, content } = req.body;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid blog ID" });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        if (req.user.id !== blog.author.toString()) {
            return res.status(403).json({ error: "You are not authorized to edit this blog" });
        }

        // Input validations
        if (title?.trim()) {
            if (title.trim().length > 200) {
                return res.status(400).json({ error: "Title too long" });
            }
            blog.title = title.trim();
        }

        if (description?.trim()) {
            if (description.trim().length > 500) {
                return res.status(400).json({ error: "Description too long" });
            }
            blog.description = description.trim();
        }

        if (content?.trim()) {
            if (content.trim().length > 50000) {
                return res.status(400).json({ error: "Content too long" });
            }
            blog.content = content.trim();
        }

        // Optional image update
        if (req.file) {
            const coverImg = req.file;
            const maxFileSize = 5 * 1024 * 1024;
            if (coverImg.size > maxFileSize) {
                return res.status(400).json({ error: "Image exceeds 5MB limit" });
            }

            const base64Image = `data:${coverImg.mimetype};base64,${coverImg.buffer.toString("base64")}`;

            try {
                const uploadRes = await cloudinary.uploader.upload(base64Image, { folder: "blogs" });
                blog.coverImg = uploadRes.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary error:", uploadError);
                return res.status(500).json({ error: "Image upload failed" });
            }
        }

        await blog.save();

        res.status(200).json({ success: true, message: "Blog updated successfully", blog });
    } catch (error) {
        console.error("Edit blog error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const likeBlog = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid blog ID" });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const isLiked = blog.likedBy.includes(req.user.id);

        if (isLiked) {
            return res.status(400).json({ message: "Blog already liked by user" });
        }

        blog.likesCount++;
        blog.likedBy.push(req.user.id);

        await blog.save();

        // remove likedBy from response
        const blogObj = blog.toObject();
        delete blogObj.likedBy;

        res.status(200).json({ message: "Blog liked successfully", blog: blogObj });
    } catch (error) {
        console.error("Like blog error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const unlikeBlog = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid blog ID" });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const userId = req.user.id;
        const isLiked = blog.likedBy.includes(userId);

        if (!isLiked) {
            return res.status(400).json({ message: "Blog not liked by user" });
        }

        blog.likesCount = Math.max(blog.likesCount - 1, 0);
        blog.likedBy = blog.likedBy.filter(uid => uid.toString() !== userId);

        await blog.save();

        // remove likedBy from response
        const blogObj = blog.toObject();
        delete blogObj.likedBy;

        res.status(200).json({ message: "Blog unliked successfully", blog: blogObj });
    } catch (error) {
        console.error("Unlike blog error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    deleteBlog,
    editBlog,
    likeBlog,
    unlikeBlog
}