import {UserRepository} from "./user-repository";
import {CreateUserDto} from "../dto/create-user-dto";
import {User} from "../entities/user";
import {PGConfig} from "../../../shared/database/pg_config";
import {AppException} from "../../../shared/exceptions/app-exception";

export class UserRepositoryImp implements UserRepository {

    constructor(private db: PGConfig) {
    }

    async create(createUserDto: CreateUserDto): Promise<void> {
        const sql = `
            INSERT INTO "users" (nickname, name, birth_date, stack)
            VALUES ($1, $2, $3, $4) RETURNING id
        `;

        const {name, nickname, birthDate, stack,} = createUserDto;
        const params = [nickname, name, birthDate, stack];
        await this.db.command(sql, params)
    }

    async findAll(): Promise<User[]> {
        const response = await this.db.command(`select *
                                                from "users"`)
        if (response.rows.length === 0) {
            return []
        }

        return response.rows;

    }

    async findById(id: string): Promise<User> {
        throw new AppException(100, '');

    }

    async getCount(): Promise<number> {
        return Promise.resolve(0);
    }
}