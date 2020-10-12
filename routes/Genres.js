const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const GenreController = require('../controllers/GenreController');
const { Genre } = require('../dao/models/Genre');

router.get('/', (req, res) => {
  GenreController.getAllGenre(req, res); // all genres
});

/* router.get('/:id', (req, res) => {
  GenreController.getGenre(req, res);
}); */
router.get('/:id', GenreController.getGenre); // get by id

router.post('/', (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  GenreController.createGenre(req, res); // create a new genre
});

/* Update a genre by Id ----- */
router.put('/:id', async (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  /* Look up the genre, If doesn't exit return 404 */
  const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!genre) return res.status(404).send('The genre with the given ID was not found !');

  res.send(genre); //Return Updated genre details
});

/* Delete a genre */
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

/* router.put('/release/:id', async (req, res) => {
  // Look up the genre, If doesn't exit return 404
  let genre = await Genre.findById(req.params.id);
  const { release } = genre;
  console.log(new Date());
  if (!genre) return res.status(404).send('The genre with the given ID was not found !');

  if (new Date() > release) {
    genre.isAvailable = true;
  }
  const result = await Genre.updateOne({ _id: req.params.id }, genre);

  res.send(result); //Return Updated genre details
}); */

/* Input Validation */
function validateInput(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(body);
}

module.exports = router;
