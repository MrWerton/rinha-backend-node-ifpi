import {User} from "../entities/user";
import {CreateUserDto} from "../dto/create-user-dto";

export interface UserRepository {
    findById(id: string): Promise<User | null>;

    findByTerm(searchTerm: string): Promise<User[]>;

    findByNickName(nickName: string): Promise<User | null>;

    findAll(): Promise<User[]>;

    getCount(): Promise<number>;

    create(createUserDto: CreateUserDto): Promise<void>;
}