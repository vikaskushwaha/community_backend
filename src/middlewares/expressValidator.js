const { validationResult } = require('express-validator')

const validateRequest = (validationRules, statusCode) => {
    return [
        ...validationRules,
        (req, res, next) => {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                // postLogs(
                //     `Error! validating ${apiName} : ${JSON.stringify(errors.array())}`,
                //     LOG_LEVEL.ERROR
                // );
                console.log(error.array());
                res.status(statusCode).json({ errors: error.array() });
                return;
            }
            next();
        }

    ]
}

module.exports = {
    validateRequest
}