        require("dotenv").config({ path: ".env.development.local" });

        const { sql } = require("@vercel/postgres");

        async function execute() {
        const deleteTable = await sql`drop table if exists akun_al_barokah`;

        const createTable = await sql`
            CREATE TABLE IF NOT EXISTS akun_al_barokah (
                id SERIAL PRIMARY KEY,
                username VARCHAR(30) NOT NULL,
                status VARCHAR(10) NOT NULL CHECK (status IN ('admin', 'pengajar')),
                password VARCHAR NOT NULL
            );
        `;
        console.log(createTable);
        }

        execute();