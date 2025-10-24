    const { Pool } = require('pg');

    const pool = new Pool({
        user: 'postgres',         // Your PostgreSQL username (default is 'postgres')
        host: 'localhost',        // Your PostgreSQL host (e.g., 'localhost' for local setup)
        database: 'posts', // The name of your database
        password: 'password', // The password you set during PostgreSQL installation
        port: 5432,               // The port PostgreSQL is running on (default is 5432)
    });

    module.exports = { pool }