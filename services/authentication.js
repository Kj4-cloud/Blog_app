require("dotenv").config();
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRETKEY;

const createTokenForUser = (user) => {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = JWT.sign(payload, secret, { expiresIn: "1h" });
  return token;
};


const validateToken = (token) => {
  const payload = JWT.verify(token, secret);
  return payload;
};

module.exports = {
  createTokenForUser,
  validateToken,
};

