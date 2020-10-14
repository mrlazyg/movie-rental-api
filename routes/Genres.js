const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const GenreController = require('../controllers/GenreController');

router.get('/', (req, res) => {
  GenreController.getAllGenre(req, res); // all genres
});

router.get('/:id', GenreController.getGenre); // get by id

router.post('/', (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  GenreController.createGenre(req, res); // create a new genre
});

router.put('/:id', (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  GenreController.updateGenre(req, res); // updated genre
});

router.delete('/:id', GenreController.deleteGenre); // delete genre

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
