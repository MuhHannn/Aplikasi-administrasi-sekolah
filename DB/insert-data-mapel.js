require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute( kode, mapel) {
  const result = await sql`
        INSERT INTO mapel_al_barokah (kode, mapel)
        VALUES (${kode}, ${mapel})
        `;
  console.log(result);
}

execute("Bahasa Arab");