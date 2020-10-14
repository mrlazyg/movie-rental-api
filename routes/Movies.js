const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/MovieController');

router.get('/', MovieController.getAllMovie); // get all
router.get('/:id', MovieController.getMovie); // get one

router.post('/', (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  MovieController.createMovie(req, res); // create
});

router.put('/:id', async (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  MovieController.updateMovie(req, res); // update
});

router.delete('/:id', MovieController.deleteMovie); // delete

/* Input Validation */
function validateInput(body) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).max(100).required(),
  });
  return schema.validate(body);
}

module.exports = router;
