require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(nama, kelamin, nomer_wa) {
  const result = await sql`
        INSERT INTO pengajar_al_barokah (nama, kelamin, nomer_wa)
        VALUES (${nama}, ${kelamin}, ${nomer_wa})
        `;
  console.log(result);
}

execute("Ustad Imam", "Laki-Laki", "08222222222");