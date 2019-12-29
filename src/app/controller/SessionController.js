/* eslint-disable class-methods-use-this */
const User = require("../model/User");

class SessionController {
  /**
   * Sing a user in generating the token
   *
   * @param {Request} req
   * @param {Response} res
   * @return user wit h jwt token
   */
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ errors: [{ msg: "User not found" }] });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ errors: [{ msg: "Invalid password" }] });
    }

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: User.generateToken(user)
    });
  }
}

module.exports = new SessionController();
