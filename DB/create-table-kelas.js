require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function createKelasTable() {
  const deleteTable = await sql`DROP TABLE IF EXISTS kelas_al_barokah`;

  // const createTable = await sql`
  //   CREATE TABLE IF NOT EXISTS kelas_al_barokah (
  //       id SERIAL PRIMARY KEY,
  //       kelas VARCHAR(30) NOT NULL UNIQUE
  //   );
  // `;
  // console.log(createTable);
}

createKelasTable();
