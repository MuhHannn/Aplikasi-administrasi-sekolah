require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(username, status, password, id) {
  const result = await sql`
        UPDATE akun_al_barokah SET nama = ${nama}, status = ${status} WHERE id = ${id}`;
  console.log("Berhasil mengupdate data", result);
  return result;
}

execute("Hanan", "admin", "admin", 2);