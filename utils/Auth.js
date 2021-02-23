const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../dao/models/User');

class Auth {
  static async userAuthentication(body) {
    let user = await User.findOne({ email: body.email });
    if (!user) return false;
    const status = await bcrypt.compare(body.password, user.password);
    const token = Auth.generateAuthToken({ email: user.email });
    if (status) return token;
    return status;
  }

  static async generateAuthToken(payload) {
    return jwt.sign(payload, 'PrivateKey');
  }
}

module.exports = Auth;
