require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(kelas, id) {
  const result = await sql`
        UPDATE kelas_al_barokah SET kelas = ${kelas} WHERE id = ${id}`;
  console.log("Berhasil mengupdate data", result);
  return result;
}

execute("1", 1);