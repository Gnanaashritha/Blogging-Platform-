const JWT = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

async function JwtValidation(req, res, next) {
  const token = req.cookies.token
  if (!token) {
    return res.status(404).json({ msg: "User must be login" });
  }
  try {
    const decodedToken = JWT.verify(token, secret_key)
    req.user = decodedToken; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token"})
  }
}
module.exports ={
    JwtValidation
}
