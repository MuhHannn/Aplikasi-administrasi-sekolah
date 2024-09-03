require("dotenv").config({ path: ".env.development.local" });

const bcrypt = require('bcrypt');
const { sql } = require("@vercel/postgres");

async function execute(username, status, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const shortenedHash = hashedPassword.substring(0, 12);  // Hanya ambil 12 karakter pertama
  const result = await sql`INSERT INTO akun_al_barokah (username, status, password) VALUES (${username}, ${status}, ${shortenedHash})`;
  console.log(result);
}

execute("Admin1", "admin", "admin123");
