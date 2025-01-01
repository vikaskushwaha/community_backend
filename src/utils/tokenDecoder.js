const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET;


const tokenDecoder = (token) => {
    const decode = jwt.verify(token, SECRET_KEY);
    return decode.email
}


module.exports = tokenDecoder