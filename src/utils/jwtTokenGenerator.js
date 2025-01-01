

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

function tokenGenerator(payload) {


    return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
};

module.exports = tokenGenerator;


