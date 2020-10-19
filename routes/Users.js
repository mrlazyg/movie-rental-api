const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/', (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  UserController.createUser(req, res);
});

/* Input Validation */
function validateInput(body) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(body);
}

module.exports = router;
