require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function createMapelTable() {
  const deleteTable = await sql`DROP TABLE IF EXISTS mapel_kelas_pengajar_al_barokah`;

  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS mapel_kelas_pengajar_al_barokah (
        id SERIAL PRIMARY KEY,
        mapel INTEGER,
        kelas INTEGER,
        pengajar INTEGER,
        FOREIGN KEY (mapel) REFERENCES mapel_al_barokah(id),
        FOREIGN KEY (kelas) REFERENCES kelas_al_barokah(id),
        FOREIGN KEY (pengajar) REFERENCES pengajar_al_barokah(id)
    );
  `;
  console.log(createTable);
}

createMapelTable();
