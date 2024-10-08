require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function createMapelTable() {
  const deleteTable = await sql`DROP TABLE IF EXISTS mapel_al_barokah`;

  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS mapel_al_barokah (
        id SERIAL PRIMARY KEY,
        kode VARCHAR(3) NOT NULL,
        mapel VARCHAR(30) NOT NULL
    );
  `;
  console.log(createTable);
}

createMapelTable();
