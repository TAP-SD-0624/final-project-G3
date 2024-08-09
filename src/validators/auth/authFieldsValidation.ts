
import Joi from 'joi';

// Define the schema for registration validation with length constraints
const registerValidation = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'First name must be a string',
      'string.min': 'First name must be at least 3 characters long',
      'string.max': 'First name must be less than or equal to 20 characters long',
      'any.required': 'First name is required',
    }),
  lastName: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Last name must be a string',
      'string.min': 'Last name must be at least 3 characters long',
      'string.max': 'Last name must be less than or equal to 20 characters long',
      'any.required': 'Last name is required',
    }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  dateOfBirth: Joi.string().isoDate().required().messages({
    'string.isoDate': 'Date of birth must be a valid date in ISO 8601 format',
    'any.required': 'Date of birth is required',
  }),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/\d/)
    .pattern(/[\W_]/)
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': {
        'regex.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      },
      'any.required': 'Password is required',
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Confirm password is required',
    }),
  role: Joi.string().valid('admin', 'user').optional().messages({
    'any.only': 'Role must be either admin or user',
  }),
});

const loginValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required',
    }),
});

export { registerValidation, loginValidation };
