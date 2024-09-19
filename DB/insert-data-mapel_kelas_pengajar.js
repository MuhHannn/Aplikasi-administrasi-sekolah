require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute( mapel, kelas, pengajar) {
  const result = await sql`
        INSERT INTO mapel_kelas_pengajar_al_barokah (mapel, kelas, pengajar)
        VALUES (${mapel}, ${kelas}, ${pengajar})
        `;
  console.log(result);
}

execute(2, 1, 1);