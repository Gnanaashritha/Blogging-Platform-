const mongoose = require("mongoose")

async function connectToDatabase() {
    const MONGODB_URL = process.env.MONGODB_URL;
    if (!MONGODB_URL) {
        console.log("MongoDB connection string is not defined in environment variables.")
        return
    }

    try {
        let connection = await mongoose.connect(MONGODB_URL)
        if (connection) {
            console.log("Successfully connected to the database")
        }
    } catch (error) {
        console.error("Failed to connect to the database: ", error);
        throw error;
    }
}

module.exports = connectToDatabase
