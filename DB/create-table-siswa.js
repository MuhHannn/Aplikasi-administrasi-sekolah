require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
  const deleteTable = await sql`drop table if exists siswa_al_barokah`;

  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS siswa_al_barokah (
        id SERIAL PRIMARY KEY,
        nisn VARCHAR(20),
        nis VARCHAR(20),
        nama VARCHAR(30) NOT NULL,
        kelamin VARCHAR(10) NOT NULL CHECK (kelamin IN ('Laki-Laki', 'Perempuan')),
        kelas INTEGER,
        tanggal_lahir VARCHAR(20) NOT NULL,
        tempat_lahir VARCHAR(50) NOT NULL,
        FOREIGN KEY (kelas) REFERENCES kelas_al_barokah(id)
    ) 
    `;
  console.log(createTable);
}

execute();