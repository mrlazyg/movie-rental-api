const _ = require('lodash');
const bcrypt = require('bcrypt');
const User = require('../dao/models/User');

class UserService {
  static async createUser(req) {
    let user = await User.findOne({ email: req.body.email });
    if (user) return 'User already registered';

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    return _.pick(user, ['_id', 'name', 'email']);
  }
}

module.exports = UserService;
