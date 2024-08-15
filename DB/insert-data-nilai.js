require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(siswa, mapel, nilai, kelas) {
  const result = await sql`
        INSERT INTO nilai_al_barokah (siswa, mapel, nilai, kelas)
        VALUES (${siswa}, ${mapel}, ${nilai}, ${kelas})
        `;
  console.log(result);
}

execute(1, 1, 100, 1);