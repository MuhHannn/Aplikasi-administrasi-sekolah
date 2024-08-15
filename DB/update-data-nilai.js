require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(siswa, mapel, nilai, kelas,  id) {
  const result = await sql`
        UPDATE nilai_al_barokah SET siswa = ${siswa}, mapel = ${mapel}, nilai = ${nilai}, kelas = ${kelas} WHERE id = ${id}`;
  console.log("Berhasil mengupdate data", result);
  return result;
}

execute(1, 1, 97, 1, 2);