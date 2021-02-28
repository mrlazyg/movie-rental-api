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
    const token = Auth.generateAuthToken(_.pick(user, ['_id', 'name']));
    if (status) return token;
    return status;
  }

  static async authorization(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. Token not found.');
    try {
      const decoded = jwt.verify(token, 'PrivateKey');
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).send('Invalid Token');
    }
  }

  static async generateAuthToken(payload) {
    return jwt.sign(payload, 'PrivateKey');
  }

  static async verifyToken(token) {
    try {
      return jwt.verify(token, 'PrivateKey');
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = Auth;
