require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(id) {
  const result = await sql`
        DELETE FROM karyawan_al_barokah WHERE id = ${id}; `;
  console.log("Berhasil menghapus data", result);
}

execute(1);