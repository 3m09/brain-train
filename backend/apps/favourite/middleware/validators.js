import { body } from 'express-validator';
import { handleValidationErrors } from '../../../libraries/errorHandler.js';

export const validateAddRecipe = [
  body('recipeId')
    .isString()
    .notEmpty()
    .withMessage('recipeId is required'),

  handleValidationErrors
];

export const validateRemoveRecipe = [
  body('recipeId')
    .isString()
    .notEmpty()
    .withMessage('recipeId is required'),

  handleValidationErrors
];