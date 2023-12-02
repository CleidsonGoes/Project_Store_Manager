const joi = require('joi');

const productSchema = joi.object({
  name: joi.string().min(5),
});

module.exports = {
  productSchema,
};