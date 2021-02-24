import jwt from "jsonwebtoken";

class AuthMiddleWare {
  static async checkToken(req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send({ error: "Please login!" });
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send({ error: "Invalid Token" });
    }
  }
}
export default AuthMiddleWare;
