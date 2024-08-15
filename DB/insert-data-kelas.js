
require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(kelas) {
  const result = await sql`
        INSERT INTO kelas_al_barokah (kelas)
        VALUES (${kelas})
        `;
  console.log(result);
}

execute("6");