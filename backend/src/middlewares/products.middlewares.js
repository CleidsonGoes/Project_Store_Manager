const fields = ['name'];

const checkFieldRequired = (req, res, next) => {
  const missingFields = fields.filter((field) => !(field in req.body));

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: 'Campos ausentes necessários',
      missingFields,
    });
  }
  return next();
};

module.exports = {
  checkFieldRequired,
};