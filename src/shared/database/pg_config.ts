import {Pool} from 'pg';

const DB_URL = "postgres://notrew:avlis@localhost:5432/postgres"

export class PGConfig {
    private pool: Pool

    constructor() {
        this.pool = new Pool({
            connectionString: DB_URL,
            connectionTimeoutMillis: Number(process.env.CONNECTION_TIMEOUT),
            min: Number(process.env.MIN_NUMBER_OF_POOL),
            max: Number(process.env.MAX_NUMBER_OF_POOL),
        });
        this._initialize();
        this._createTables();
    }

    async _initialize() {
        try {
            await this.pool.connect();
            console.log(('started'))

        } catch (err) {
            setTimeout(() => {
                console.log(`Connection error detected. Reconnecting in 2 seconds`)
            }, 2000)
        }

    }

    async _createTables() {
        await this.pool.query(`
            CREATE TABLE IF NOT EXISTS "users"
            (
                id
                SERIAL
                PRIMARY
                KEY,
                nickname
                VARCHAR
            (
                32
            ) NOT NULL UNIQUE,
                name VARCHAR
            (
                100
            ) NOT NULL,
                birth_date DATE NOT NULL,
                stack VARCHAR
            (
                32
            )[]
                );


        `)
        console.log('creaated')
    }


    async command(sql: string, option?: any[]) {
        console.log(sql)
        return this.pool.query(sql, option);
    }

}

