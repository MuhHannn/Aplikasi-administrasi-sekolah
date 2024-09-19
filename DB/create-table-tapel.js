require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function createMapelTable() {
  const deleteTable = await sql`DROP TABLE IF EXISTS tapel_al_abrokah`;

  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS tapel_al_barokah (
        id SERIAL PRIMARY KEY,
        tapel VARCHAR(30) NOT NULL,
        status_aktif BOOLEAN DEFAULT TRUE
    );
  `;
  console.log(createTable);
}

createMapelTable();
