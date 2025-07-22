// Custom Joi validators
import Joi from 'joi';

const objectId = (value: string, helpers: Joi.CustomHelpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message({ custom: '"{{#label}}" must be a valid mongo id' });
  }
  return value;
};

// Add other custom validators as needed (e.g., for phone numbers, dates)

export { objectId };
