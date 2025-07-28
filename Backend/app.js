const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// ~------------------ CORS
// CORS origin policy supporting multiple URLs from env
const allowedOrigins = process.env.ALLOWED_CORS_ORIGINS
    && process.env.ALLOWED_CORS_ORIGINS.split(',').map(origin => origin.trim())

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // if you're using cookies or sessions
};
app.use(cors(corsOptions));



// *--------------------- ROUTES IMPORT
const authRouter = require('./routes/auth.route.js')
const blogRouter = require('./routes/blogs.route.js')





// *--------------------- ROUTES DECLARATION
app.use('/api/auth', authRouter)
app.use('/api/blogs', blogRouter)



module.exports = app