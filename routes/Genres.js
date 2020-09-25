const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();

const Genre = require('../dao/models/Genre');

/* METHOD : GET ----- */
router.get('/', async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

/* METHOD : POST ----- */
router.post('/', async (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  let genre = new Genre(req.body);
  genre = await genre.save();

  res.send(genre);
});

/* METHOD : PUT ----- */
router.put('/:id', async (req, res) => {
  /* If Invalid return 400 - Bad request */
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  /* Look up the genre, If doesn't exit return 404 */
  const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!genre) return res.status(404).send('The genre with the given ID was not found !');

  res.send(genre); //Return Updated genre details
});

router.put('/release/:id', async (req, res) => {
  /* Look up the genre, If doesn't exit return 404 */
  let genre = await Genre.findById(req.params.id);
  const { release } = genre;
  console.log(new Date());
  if (!genre) return res.status(404).send('The genre with the given ID was not found !');

  if (new Date() > release) {
    genre.isAvailable = true;
  }
  const result = await Genre.updateOne({ _id: req.params.id }, genre);

  res.send(result); //Return Updated genre details
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
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
