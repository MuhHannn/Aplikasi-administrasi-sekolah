require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(mapel, pengajar, kelas,  id) {
  const result = await sql`
        UPDATE mapel_al_barokah SET mapel = ${mapel}, pengajar = ${pengajar}, kelas = ${kelas} WHERE id = ${id}`;
  console.log("Berhasil mengupdate data", result);
  return result;
}

execute("Bahasa Inggris", 2, 1);