const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();

const Customer = require('../dao/models/Customer');

/* Get all customers ----- */
router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

/* Get a customer by Id */
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

/* Create a new customer ----- */
router.post('/', async (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  let customer = new Customer(req.body);
  customer = await customer.save();

  res.send(customer);
});

/* Update a customer by Id ----- */
router.put('/:id', async (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!customer) return res.status(404).send('The customer with the given ID was not found !');

  res.send(customer);
});

/* Delete a customer */
router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

/* Input Validation */
function validateInput(body) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(13).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(body);
}

module.exports = router;
