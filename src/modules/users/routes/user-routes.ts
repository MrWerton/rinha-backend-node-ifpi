import {Router} from "express";
import {UserController} from "../controllers/user-controller";

export const userRoutes = Router();

const userController = new UserController();
userRoutes.post('/pessoas/', userController.create)
userRoutes.get('/pessoas/:id', userController.getById)
userRoutes.get('/pessoas/', userController.getByTerm)
userRoutes.get('/contagem-pessoas', userController.getCount)