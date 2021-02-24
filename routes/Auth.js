const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const Auth = require('../utils/Auth');

router.post('/', async (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  const authStatus = await Auth.authentication(req.body);
  if (!authStatus) return res.status(400).send('Invalid email or password');
  res.send(authStatus);
});

/* Input Validation */
function validateInput(body) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(body);
}

module.exports = router;
