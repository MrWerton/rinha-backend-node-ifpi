import { Pool } from 'pg';



class PGConfig {
    constructor(private pool: Pool) {
        this.pool = new Pool({
            connectionString: process.env.DB_URL,
            connectionTimeoutMillis: Number(process.env.CONNECTION_TIMEOUT),
            min: Number(process.env.MIN_NUMBER_OF_POOL),
            max: Number(process.env.MAX_NUMBER_OF_POOL),

        }).on('error', this._initialize).once('connect', this._createTables);
    }

    _initialize() {
        try {
            this.pool.connect();
        } catch (err) {
            setTimeout(() => {
                console.log(`Connection error detected. Reconnecting in 2 seconds`)
            }, 2000)
        }

    }

    _createTables() {
        const sql = `
        CREATE TABLE my_table (
            id SERIAL PRIMARY KEY,
            nickname VARCHAR(32) NOT NULL UNIQUE,
            name VARCHAR(100) NOT NULL,
            birth_date DATE NOT NULL,
            stack VARCHAR(32)[],
        );
        
        CREATE INDEX idx_nickname ON my_table (nickname);
        `

        return this.pool.query(sql)
    }



    command(sql: string, option?: any[]) {
        return this.pool.query(sql, option);
    }

}

