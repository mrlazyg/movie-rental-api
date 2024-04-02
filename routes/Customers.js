const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const CustomerConroller = require('../controllers/CustomerController');

router.get('/', CustomerConroller.getAllCustomer); // get all
router.get('/:id', CustomerConroller.getCustomer); // get one

router.post('/', (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  CustomerConroller.createCustomer(req, res); // create one
});

router.put('/:id', (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  CustomerConroller.updateCustomer(req, res); // update
});

router.delete('/:id', CustomerConroller.deleteCustomer); // delete

/* Input Validation */
function validateInput(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(10).max(13).required(),
    isGold: Joi.boolean(),
    email: Joi.string(),
  });
  return schema.validate(body);
}

module.exports = router;
