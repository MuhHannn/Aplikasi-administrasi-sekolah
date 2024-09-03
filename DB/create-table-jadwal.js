require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
  // Drop existing table if it exists
  const deleteTable = await sql`DROP TABLE IF EXISTS jadwal_al_barokah`;

  // Create the jadwal_al_barokah table with foreign key references
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS jadwal_al_barokah (
        id SERIAL PRIMARY KEY,
        hari VARCHAR(9) NOT NULL,
        jam VARCHAR(10) NOT NULL,
        kelas INTEGER NOT NULL,
        mapel INTEGER NOT NULL,
        pengajar INTEGER NOT NULL,
        FOREIGN KEY (kelas_id) REFERENCES kelas_al_barokah(id),
        FOREIGN KEY (mapel_id) REFERENCES mapel_al_barokah(id),
        FOREIGN KEY (pengajar_id) REFERENCES pengajar_al_barokah(id)
    );
  `;
  console.log(createTable);
}

execute();
