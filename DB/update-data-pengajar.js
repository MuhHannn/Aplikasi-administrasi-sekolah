require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(nama, status, id) {
  const result = await sql`
        UPDATE karyawan_al_barokah SET nama = ${nama}, status = ${status} WHERE id = ${id}`;
  console.log("Berhasil mengupdate data", result);
  return result;
}

execute("Hanan", "admin", 2);