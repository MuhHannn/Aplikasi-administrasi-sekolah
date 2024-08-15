import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const { kelas } = req.body;

  if (!kelas) {
    return res.status(400).json({ error: "data harus diisi" });
  }

  try {
    // Attempt to insert the new kelas value into the database
    await sql`INSERT INTO kelas_al_barokah (kelas) VALUES (${kelas})`;

    return res.status(200).json({ message: "saved" });
  } catch (error) {
    // Check if the error is due to a unique constraint violation
    if (error.code === '23505') { // PostgreSQL error code for unique violation
      return res.status(409).json({ error: "kelas already exists" });
    }

    // For other errors, return a generic server error
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "server error" });
  }
}
