import {UserRepository} from "./user-repository";
import {CreateUserDto} from "../dto/create-user-dto";
import {User} from "../entities/user";
import {PGConfig} from "../../../shared/database/pg_config";
import {NotFoundException} from "../../../shared/exceptions/not-found-exception";

export class UserRepositoryImp implements UserRepository {
    constructor(private db: PGConfig) {
    }

    async findByNickName(nickName: string): Promise<User | null> {
        const sql = `SELECT *
                     FROM "users"
                     WHERE nickname = $1`


        const result = await this.db.command(sql, [nickName])

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    }

    async create(createUserDto: CreateUserDto): Promise<void> {
        const sql = `
            INSERT INTO "users" (name, nickname, birth_date, stack)
            VALUES ($1, $2, $3, $4)
        `;

        const {name, nickname, birthDate: birth_date, stack} = createUserDto;
        const params = [nickname, name, birth_date, stack];
        await this.db.command(sql, params)
    }

    async findAll(): Promise<User[]> {
        const sql = `select *
                     from "users"`;
        const response = await this.db.command(sql)
        if (response.rows.length === 0) {
            return []
        }

        return response.rows;

    }

    async findById(id: string): Promise<User | null> {
        const sql = `SELECT *
                     FROM "users"
                     WHERE id = $1`


        const result = await this.db.command(sql, [Number(id)])

        if (result.rows.length === 0) {
            throw new NotFoundException('User not founded');

        }

        return result.rows[0];
    }

    async getCount(): Promise<number> {
        const result = await this.db.command(`SELECT COUNT(*) AS total
                                              FROM "users"
        `)

        if (result.rows.length === 0) {
            return 0;
        }
        return result.rows[0].total as number

    }

    async findByTerm(searchTerm: string): Promise<User[]> {
        const sql = `
            SELECT *
            FROM "users"
            WHERE nickname ILIKE '%' || $1 || '%'
               OR name ILIKE '%' || $1 || '%'
               OR EXISTS (
                SELECT 1
                FROM unnest(stack) AS s
                WHERE s ILIKE '%' || $1 || '%'
                )
        `;
        const result = await this.db.command(sql, [searchTerm]);

        if (result.rows.length === 0) {
            return [];
        }

        return result.rows;
    }


}