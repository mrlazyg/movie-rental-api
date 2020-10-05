const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();

const Movie = require('../dao/models/Movie');
const { Genre } = require('../dao/models/Genre');

/* Get all movies ----- */
router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

/* Get movie by Id */
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

/* Create a new movie ----- */
router.post('/', async (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const genre = await Genre.findById(req.body.genreId);
  req.body.genre = genre;
  delete req.body.genreId;

  let movie = new Movie(req.body);
  movie = await movie.save();

  res.send(movie);
});

/* Update a movie by Id ----- */
router.put('/:id', async (req, res) => {
  /* If Invalid return 400 - Bad request */
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  /* Look up the genre, If doesn't exit return 404 */
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!movie) return res.status(404).send('The movie with the given ID was not found !');

  res.send(movie); //Return Updated genre details
});

/* Delete a movie */
router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

/* Input Validation */
function validateInput(body) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    release: Joi.date(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).max(100).required(),
  });
  return schema.validate(body);
}

module.exports = router;
