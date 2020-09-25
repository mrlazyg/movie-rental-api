function log(req, res, next) {
  console.log('headers :', req.headers);
  next();
}

module.exports = log;
