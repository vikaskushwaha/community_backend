const { body, cookie } = require('express-validator');

const SECRET_KEY = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const signupValidation = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),

    body('email')
        .isEmail().withMessage('Invalid email address'),


    body('phone')
        .isMobilePhone().withMessage('Invalid phone number')
        .notEmpty().withMessage('Phone number is required')
];


const loginValidation = [
    body('email')
        .isEmail().withMessage('Invalid email address')
]

const authorizationValidator = [
    cookie("auth_token")
        .notEmpty()
        .withMessage("Unauthorized: Authorization token is required")
        .custom((token) => {
            try {
                jwt.verify(token, SECRET_KEY);
                return true;
            } catch {
                throw new Error(`Unauthorized: Invalid or expired token`);
            }
        }),
];

module.exports = {
    signupValidation,
    loginValidation,
    authorizationValidator

};