import bcrypt from "bcryptjs";
import User from "../../models/User";
import jwt from "jsonwebtoken";

class authController {
  static async signup(req, res) {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(400).json({ error: "Email is unavailable" });
    }
    if (req.body.password !== req.body.passwordConf) {
      res.status(400).json({ error: "Passwords do not match" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    try {
      await user.save();
      res.status(201).json({ msg: "Signed up successfuly" });
    } catch (error) {
      res.status(400).json({ error: "Something went wrong", err: error });
    }
  }
  static async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ error: "Incorrect credentials" });
      }
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) {
        return res.status(400).json({ error: "Incorrect credentials" });
      }

      const token = jwt.sign(
        { email: user.email, username: user.username },
        process.env.JWT_SECRET
      );
      return res.status(200).json({ msg: "Logged in successfuly", token: token });
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong", err: error });
    }
  }
}
export default authController;
