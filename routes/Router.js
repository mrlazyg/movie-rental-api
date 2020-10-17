const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const newLocal = `<br><h2>Go to <b style='color:red;'>/api/courses</b> to see course details</h2>
  <br>
  <h2>Go to <b style='color:red;'>/api/genres</b> to see genre details</h2>
  <br>
  <h2>Go to <b style='color:red;'>/api/customers</b> to see customer details</h2>`;
  res.send(newLocal);
});

module.exports = router;
