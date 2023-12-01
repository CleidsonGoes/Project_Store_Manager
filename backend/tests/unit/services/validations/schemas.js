const joi = require('joi');

const productSchema = joi.object({
  name: joi.string().length(5),
});

module.exports = {
  productSchema,
};