const Joi = require("@hapi/joi");

export const validateSignup = (req, res, next) => {
  console.log("validating");
  const schema = Joi.object({
    username: Joi.string()
      .regex(/[a-zA-Z]/)
      .required()
      .min(3)
      .max(24)
      .messages({
        "string.empty": "Username can't be empty",
        "string.min": "Username must be at least {#limit} characters long",
        "any.max": "Username must be below {#limit} characters long",
        "any.required": "Username is required",
        "string.pattern.base": "Please provide a meaningful username",
      }),

    email: Joi.string()
      .regex(/[a-zA-Z]/)
      .required()
      .min(6)
      .max(24)
      .messages({
        "string.empty": "Username is can't be empty",
        "string.min": "Username must be at least {#limit} characters long",
        "any.max": "Username must be below {#limit} characters long",
        "any.required": "Username is required",
        "string.pattern.base": "Please provide a meaningful username",
      }),
    password: Joi.string()
      .regex(/[a-zA-Z]/)
      .min(6)
      .max(24)
      .required()
      .messages({
        "string.empty": "Password can't be empty",
        "any.required": "Password is required",
        "string.pattern.base": "Please provide a meaningful password",
        "string.min": "Password must be at least {#limit} characters long",
        "any.max": "Password must be below {#limit} characters long",
        "string.pattern.base": "Please provide a meaningful password",
      }),
    passwordConf: Joi.string()
      .regex(/[a-zA-Z]/)
      .min(6)
      .max(24)
      .required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .regex(/[a-zA-Z]/)
      .required()
      .min(6)
      .max(24)
      .messages({
        "string.empty": "Username is can't be empty",
        "string.min": "Username must be at least {#limit} characters long",
        "any.max": "Username must be below {#limit} characters long",
        "any.required": "Username is required",
        "string.pattern.base": "Please provide a meaningful username",
      }),
    password: Joi.string()
      .regex(/[a-zA-Z]/)
      .min(6)
      .max(24)
      .required()
      .messages({
        "string.empty": "Password can't be empty",
        "any.required": "Password is required",
        "string.pattern.base": "Please provide a meaningful password",
        "string.min": "Password must be at least {#limit} characters long",
        "any.max": "Password must be below {#limit} characters long",
        "string.pattern.base": "Please provide a meaningful password",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
