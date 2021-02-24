/* const Auth = require('../utils/Auth');

class Middleware {
  static async auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. Token not found.');
    try {
      const decoded = Auth.verifyToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).send('Invalid Token');
    }
  }
}

module.exports = Middleware;
 */
