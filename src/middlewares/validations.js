const Joi = require("@hapi/joi");

export const validateSignup = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
      .trim()
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
    email: Joi.string().trim().min(8).email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email",
      "string.empty": "Email required",
      "string.min": "Email must be at least {#limit} characters long",
      "any.required": "Email is required",
    }),
    password: Joi.string()
      .trim()
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
      }),
    passwordConf: Joi.string()
      .trim()
      .regex(/[a-zA-Z]/)
      .min(6)
      .max(24)
      .required()
      .messages({
        "string.empty": "Password confirmation can't be empty",
        "any.required": "Password confirmation is required",
        "string.pattern.base":
          "Please provide a meaningful password confirmation",
        "string.min":
          "Password confirmation must be at least {#limit} characters long",
        "any.max":
          "Password confirmation must be below {#limit} characters long",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(8).email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email",
      "string.empty": "Email required",
      "string.min": "Email must be at least {#limit} characters long",
      "any.required": "Email is required",
    }),
    password: Joi.string()
      .trim()
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
export const createTodoValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().trim().required().min(3).max(50).messages({
      "string.empty": "Title can't be empty",
      "string.min": "Title must be at least {#limit} characters long",
      "any.max": "Title must be below {#limit} characters long",
      "any.required": "Title is required",
    }),
    description: Joi.string().trim().required().messages({
      "string.empty": "Description can't be empty",
      "string.base": "Description must be a string",
      "any.required": "Description is required",
    }),
    priority: Joi.string()
      .trim()
      .required()
      .valid("LOW", "MEDIUM", "HIGH")
      .messages({
        "string.empty": "Priority can't be empty",
        "string.base": "Priority must be a string",
        "any.required": "Priority is required",
        "string.valid": "Priority can only be LOW,HIGH or MEDIUM",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
export const updateTodoValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(50).messages({
      "string.empty": "Title can't be empty",
      "string.min": "Title must be at least {#limit} characters long",
      "any.max": "Title must be below {#limit} characters long",
      "any.required": "Title is required",
    }),
    description: Joi.string().trim().messages({
      "string.empty": "Description can't be empty",
      "string.base": "Description must be a string",
      "any.required": "Description is required",
    }),
    priority: Joi.string().trim().valid("LOW", "MEDIUM", "HIGH").messages({
      "string.empty": "Priority can't be empty",
      "string.base": "Priority must be a string",
      "any.required": "Priority is required",
      "any.valid": "Priority can only be LOW,HIGH or MEDIUM",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
