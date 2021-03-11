const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateQuizInput(data) {
  let errors = {};

  data.topic = validText(data.topic) ? data.topic : '';
  data.description = validText(data.description) ? data.description : '';

  if (!Validator.isLength(data.topic, { min: 2, max: 20 })) {
    errors.topic = 'Topic must be between 2 and 20 characters';
  }

  if (Validator.isEmpty(data.topic)) {
    errors.topic = 'Topic field is required';
  }

  if (!Validator.isLength(data.description, { min: 5, max: 140 })) {
    errors.description = 'Description must be between 5 and 140 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};