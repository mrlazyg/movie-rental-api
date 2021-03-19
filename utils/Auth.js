const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../dao/models/User');

class Auth {
  static async authentication(body) {
    let user = await User.findOne({ email: body.email });
    // console.log(user);
    if (!user) return false;
    const status = await bcrypt.compare(body.password, user.password);
    const token = await Auth.generateAuthToken(_.pick(user, ['_id', 'name', 'email']));
    if (status) return { user: _.pick(user, ['_id', 'name', 'email']), token };
    return status;
  }

  static async authorization(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. Token not found.');
    try {
      const decoded = await Auth.verifyToken(token, 'PrivateKey');
      req.user = decoded;
      res.header('x-auth-valid', true);
      next();
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  static async generateAuthToken(payload) {
    return jwt.sign(payload, 'PrivateKey', { expiresIn: 60 * 60 });
  }

  static async verifyToken(token) {
    try {
      return jwt.verify(token, 'PrivateKey');
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Auth;
