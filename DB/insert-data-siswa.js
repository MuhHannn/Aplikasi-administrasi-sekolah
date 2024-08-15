require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(nama, kelas) {
  const result = await sql`
        INSERT INTO siswa_al_barokah (nama, kelas)
        VALUES (${nama}, ${kelas})
        `;
  console.log(result);
}

execute("Muhammad Hanan", 1);