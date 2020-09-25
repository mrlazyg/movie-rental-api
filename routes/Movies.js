const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();

const Movie = require('../dao/models/Movie');

/* METHOD : GET ----- */
router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('The genre with the given ID was not found.');

  res.send(movie);
});

/* METHOD : POST ----- */
router.post('/', async (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  let movie = new Movie(req.body);
  movie = await movie.save();

  res.send(movie);
});

/* METHOD : PUT ----- */
router.put('/:id', async (req, res) => {
  /* If Invalid return 400 - Bad request */
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  /* Look up the genre, If doesn't exit return 404 */
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!movie) return res.status(404).send('The genre with the given ID was not found !');

  res.send(movie); //Return Updated genre details
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie) return res.status(404).send('The genre with the given ID was not found.');

  res.send(movie);
});

/* Input Validation */
function validateInput(body) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    genre: Joi.string().min(3).max(50).required(),
    release: Joi.date(),
    isAvailable: Joi.boolean(),
  });
  return schema.validate(body);
}

module.exports = router;
