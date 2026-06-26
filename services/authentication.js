require('dotenv').config();
const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRETKEY;

console.log(secret);