import express from "express";
import { login, register } from "../controllers/UserController.js";
import { Encrypt } from "../middlewares/Hash.js";

const userRouter = express.Router();

userRouter.get("/", login);
userRouter.post("/", Encrypt, register);

export default userRouter;
