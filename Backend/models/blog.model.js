const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    coverImg: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    likesCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


const Blog = mongoose.model("Blog", BlogSchema)
module.exports = Blog