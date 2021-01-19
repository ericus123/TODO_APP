import { Router } from "express";
import { validateSignup, validateLogin } from "../../middlewares/validations";
import authController from "../../controllers/auth/index";
import AuthMiddleWare from "../../middlewares/auth";

const authRoute = new Router();

authRoute.post("/signup", validateSignup, authController.signup);
authRoute.post("/login", validateLogin, authController.login);
export default authRoute;
