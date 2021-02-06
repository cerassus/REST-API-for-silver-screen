const Joi = require('joi');

const validateUserRegister = (body) => {
    const joi_schema = Joi.object({
        username: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return joi_schema.validate(body)
}

module.exports.validateUserRegister = validateUserRegister;
module.exports.validateUserLogin = validateUserRegister;