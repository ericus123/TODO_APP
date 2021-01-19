import jwt from "jsonwebtoken";

class AuthMiddleWare {
  static async checkToken(req, res) {
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).json({ error: "Please login" });
      try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
      } catch (error) {
        res.status(400).json({ error: "Invalid token" });
      }
    }
  }
}
export default AuthMiddleWare;
