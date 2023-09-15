import {Request, Response} from "express";
import {CreateUserDto} from "../dto/create-user-dto";
import {UserRepository} from "../repositories/user-repository";
import {ServiceLocator} from "../../../shared/service-locator";
import {NotFoundException} from "../../../shared/exceptions/not-found-exception";


export class UserController {


    async getAll(req: Request, res: Response): Promise<Response> {
        const repository = ServiceLocator.getInstance().get<UserRepository>('user-repository')


        const response = await repository.findAll();

        return res.json(response);
    }

    async create(req: Request, res: Response): Promise<Response> {

        const {nome, apelido, nascimento, stack} = req.body;
        const repository = ServiceLocator.getInstance().get<UserRepository>('user-repository')

        const userAlreadyExists = await repository.findByNickName(apelido);
        console.log(!userAlreadyExists)
        if (userAlreadyExists !== null) {

            throw new NotFoundException('Nickname already in use');
        }

        const userDto = new CreateUserDto(nome, apelido, nascimento, stack);

        await repository.create(userDto);

        return res.sendStatus(201);
    }


    async getByTerm(req: Request, res: Response): Promise<Response> {
        const repository = ServiceLocator.getInstance().get<UserRepository>('user-repository')


        const term = req.query.t as string;


        const response = await repository.findByTerm(term);

        return res.json(response);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const repository = ServiceLocator.getInstance().get<UserRepository>('user-repository')


        const {id} = req.params;


        const response = await repository.findById(id);

        return res.json(response);
    }

    async getCount(req: Request, res: Response): Promise<Response> {
        const repository = ServiceLocator.getInstance().get<UserRepository>('user-repository')


        const response = await repository.getCount();

        return res.json({total: Number(response)});
    }


}