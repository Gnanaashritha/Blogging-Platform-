const JWT = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

async function JwtValidation(req, res, next) {
  const token = req.cookies.token
  if (!token) {
    return res.status(404).json({ msg: "User must be login" });
  }
  const isTokenValid = JWT.verify(token, secret_key);
  if (isTokenValid == false) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
  next()
}
module.exports ={
    JwtValidation
}