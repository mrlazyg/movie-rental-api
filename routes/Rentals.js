const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const RentalController = require('../controllers/RentalController');

router.get('/', RentalController.getAllRental);
router.get('/:id', RentalController.getRental);

router.post('/', async (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  RentalController.createRental(req, res);
});

router.delete('/:id', RentalController.deleteRental);

/* Input Validation */
function validateInput(body) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });
  return schema.validate(body);
}

module.exports = router;
