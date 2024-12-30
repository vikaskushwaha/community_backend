const { body } = require('express-validator');

const signupValidation = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),

    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),

    body('phone')
        .isMobilePhone().withMessage('Invalid phone number')
        .notEmpty().withMessage('Phone number is required')
];

module.exports = {
    signupValidation
};