const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'studAdmin',
    password: 'bazepodataka',
    port: 5432,
})

module.exports = {
    query: (text, params, callback) => {
        const start = Date.now();
        return pool.query(text, params)
            .then(res => {
                const duration = Date.now() - start;
                console.log('executed query', { text, params, duration, rows: res.rowCount })
                return res;
            });
    }
}
