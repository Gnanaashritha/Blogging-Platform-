const JWT = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

async function handleGenerateToken(name, email) {
  const token = JWT.sign(
    {
      name,
      email,
    },
    secret_key,
    {expiresIn:3600}
  );
  return token
}

module.exports = {
    handleGenerateToken,
}
