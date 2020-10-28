const UserService = require('../services/UserService');

class UserController {
  static async createUser(req, res) {
    const user = await UserService.createUser(req);
    if (user === 'registered') return res.status(400).send(user);
    res.send(user);
  }
}

module.exports = UserController;
