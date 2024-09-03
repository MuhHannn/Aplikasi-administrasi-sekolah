require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute( mapel, pengajar, kelas) {
  const result = await sql`
        INSERT INTO mapel_al_barokah (mapel, pengajar, kelas)
        VALUES (${mapel}, ${pengajar}, ${kelas})
        `;
  console.log(result);
}

execute("Bahasa Arab", 2, 1);