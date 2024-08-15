require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(nama, kelas, id) {
  const result = await sql`
        UPDATE siswa_al_barokah SET nama = ${nama}, kelas = ${kelas} WHERE id = ${id}`;
  console.log("Berhasil mengupdate data", result);
  return result;
}

execute("Uwais", 1, 2);