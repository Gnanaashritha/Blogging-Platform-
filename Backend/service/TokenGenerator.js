const JWT = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

async function handleGenerateToken(id, name, email) {
  const token = JWT.sign(
    {
      id,
      name,
      email,
    },
    jwtSecretKey,
    {expiresIn:3600}
  );
  return token
}

module.exports = {
    handleGenerateToken,
}
