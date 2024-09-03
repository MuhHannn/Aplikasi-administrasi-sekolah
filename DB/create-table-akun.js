require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
  try {
    // Drop the table if it exists
    const deleteTable = await sql`DROP TABLE IF EXISTS akun_al_barokah`;

    // Create the table
    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS akun_al_barokah (
        id SERIAL PRIMARY KEY,
        username VARCHAR(10) NOT NULL,
        nama VARCHAR(70) NOT NULL,
        status VARCHAR(10) NOT NULL CHECK (status IN ('admin', 'pengajar')),
        password VARCHAR(255) NOT NULL
      );
    `;
    
    console.log("Table created successfully:", createTable);
  } catch (error) {
    console.error("Error executing SQL:", error);
  }
}

execute();
