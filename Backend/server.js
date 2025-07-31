const dotenv = require("dotenv");
dotenv.config();

const connectToDatabase = require("./service/db.js");
connectToDatabase();


const app = require("./app");
const port = process.env.PORT || 5000;

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`SERVER running at port: ${port}`)
  })
}).catch(() => {
  console.log("Failed to connect to the database.")
})
