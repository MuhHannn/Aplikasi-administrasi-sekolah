require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
    await sql`DROP TABLE IF EXISTS nilai_al_barokah`;

  // const createTable = await sql`
  //   CREATE TABLE IF NOT EXISTS nilai_al_barokah (
  //       id SERIAL PRIMARY KEY,
  //       siswa INTEGER,
  //       mapel INTEGER,
  //       nilai INTEGER NOT NULL,
  //       kelas INTEGER,
  //       tapel INTEGER,
  //       FOREIGN KEY (siswa) REFERENCES siswa_al_barokah(id),
  //       FOREIGN KEY (mapel) REFERENCES mapel_al_barokah(id),
  //       FOREIGN KEY (kelas) REFERENCES kelas_al_barokah(id),
  //       FOREIGN KEY (tapel) REFERENCES tapel_al_barokah(id)
  //   );
  // `;
  // console.log('Table created or already exists:', createTable);
}

execute();
