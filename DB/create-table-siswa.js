require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
  const deleteTable = await sql`drop table if exists siswa_al_barokah`;

  // const createTable = await sql`
  //   CREATE TABLE IF NOT EXISTS siswa_al_barokah (
  //       id SERIAL PRIMARY KEY,
  //       nama VARCHAR(30) NOT NULL,
  //       kelamin VARCHAR(10) NOT NULL CHECK (status IN ('Laki-Laki', 'Perempuan')),
  //       kelas INTEGER NOT NULL,
  //       FOREIGN KEY (kelas) REFERENCES kelas_al_barokah(id)
  //   ) 
  //   `;
  // console.log(createTable);
}

execute();