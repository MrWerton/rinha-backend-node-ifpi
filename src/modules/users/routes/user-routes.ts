import {Router} from "express";
import {UserController} from "../controllers/user-controller";

export const userRoutes = Router();

const userController = new UserController();
userRoutes.get('/', userController.getAll)
userRoutes.post('/', userController.create)