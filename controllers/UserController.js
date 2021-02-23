const UserService = require('../services/UserService');
const Auth = require('../utils/Auth');

class UserController {
  static async createUser(req, res) {
    const user = await UserService.createUser(req);
    if (user === 'registered') return res.status(400).send(user);
    const token = Auth.generateAuthToken(user);
    res.header('x-auth-token', token).send(user);
  }
}

module.exports = UserController;
