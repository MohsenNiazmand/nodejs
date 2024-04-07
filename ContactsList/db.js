import pg from 'pg'
const { Pool } = pg

const pool = new Pool(
    {
        database:'7learn',
        user: 'postgres',
        password:'10203040'
    }
)

export const query = (text, params) => pool.query(text, params)
