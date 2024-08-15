require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
  const deleteTable = await sql`drop table if exists pengajar`;

  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS pengajar_al_barokah (
        id SERIAL PRIMARY KEY,
        nama VARCHAR(30) NOT NULL,
        kelamin VARCHAR(10) NOT NULL CHECK (status IN ('Laki-Laki', 'Perempuan')),
        nomer_wa VARCHAR(13) NOT NULL
    );
  `;
  console.log(createTable);
}

execute();