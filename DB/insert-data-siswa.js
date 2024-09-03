require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(nama, nis, kelamin) {
  const result = await sql`
        INSERT INTO siswa_al_barokah (nama, nis, kelamin)
        VALUES (${nama}, ${nis}, ${kelamin})
        `;
  console.log(result);
}

execute("Muhammad Hanan", 1);