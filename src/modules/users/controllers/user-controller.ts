import {Request, Response} from "express";
import {CreateUserDto} from "../dto/create-user-dto";
import {UserRepository} from "../repositories/user-repository";
import {ServiceLocator} from "../../../shared/service-locator";


export class UserController {


    async getAll(req: Request, res: Response): Promise<Response> {
        const repository = ServiceLocator.getInstance().get<UserRepository>('user-repository')


        const response = await repository.findAll();

        return res.json(response);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const repository = ServiceLocator.getInstance().get<UserRepository>('user-repository')


        const {name, nickname, birthDate, stack} = req.body;

        const userDto = new CreateUserDto(name, nickname, birthDate, stack);

        const response = await repository.create(userDto);

        return res.json(response);
    }


}