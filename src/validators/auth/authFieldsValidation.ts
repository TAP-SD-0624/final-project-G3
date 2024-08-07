import { body } from 'express-validator';

const registerValidation = () => {
  return [
    // Validate first name
    body('firstName')
      .notEmpty()
      .withMessage('First name is required')
      .isString()
      .withMessage('First name must be a string'),

    // Validate last name
    body('lastName')
      .notEmpty()
      .withMessage('Last name is required')
      .isString()
      .withMessage('Last name must be a string'),

    // Validate email
    body('email')
      .isEmail()
      .withMessage('Invalid email format'),

    // Validate date of birth
    body('dateOfBirth')
      .notEmpty()
      .withMessage('Date of birth is required')
      .isISO8601()
      .withMessage('Date of birth must be a valid date in ISO 8601 format'),

    // Validate password
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/\d/)
      .withMessage('Password must contain at least one number')
      .matches(/[\W_]/)
      .withMessage('Password must contain at least one special character'),

    // Validate confirm password
    body('confirmPassword')
      .notEmpty()
      .withMessage('Confirm password is required')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match'),

    // Validate role
    body('role')
      .optional()
      .isIn(['admin', 'user'])
      .withMessage('Role must be either admin or user'),
  ];
};


const loginValidation = () => {
  return [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').exists().withMessage('Password is required'),
  ];
};

export { registerValidation, loginValidation };
