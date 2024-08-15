require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(nama, status) {
  const result = await sql`
        INSERT INTO pengajar_al_barokah (nama)
        VALUES (${nama})
        `;
  console.log(result);
}

execute("Ustad Imam", "pengajar");