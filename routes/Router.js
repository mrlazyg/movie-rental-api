const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
  { id: 4, name: 'course4' },
  { id: 5, name: 'course5' },
];

/* METHOD : GET ----- */
router.get('/', (req, res) => {
  const newLocal = `<h2>Type <b style='color:red;'>/api/courses</b> to see course details</h2>
  <br>
  <h2>Type <b style='color:red;'>/api/genres</b> to see genre details</h2>
  <br>
  <h2>Type <b style='color:red;'>/api/customers</b> to see customer details</h2>`;
  res.send(newLocal);
});

router.get('/courses', (req, res) => {
  res.send(courses);
});

router.get('/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found !'); // 404 Object not found

  res.send(course);
});

/* METHOD : POST ----- */
router.post('/courses', (req, res) => {
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

/* METHOD : PUT ----- */
router.put('/courses/:id', (req, res) => {
  /* Look up the course, If doesn't exit return 404 */
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found !');

  /* If Invalid return 400 - Bad request */
  const { error } = validateInput(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  course.name = req.body.name; //Update course
  res.send(course); //Return Updated course details
});

/* Input Validation */
function validateInput(body) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });
  return schema.validate(body);
}

module.exports = router;
