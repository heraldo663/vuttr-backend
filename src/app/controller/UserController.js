/* eslint-disable class-methods-use-this */
const User = require("../model/User");

class UserController {
  async store(req, res) {
    const { email } = req.body;

    if (await User.findOne({ email })) {
      res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create(req.body);
    return res.status(201).json(user);
  }
}

module.exports = new UserController();
