import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  // cek method
  if (req.method !== "GET") {
    return res.status(405).json({ error: "method not allowed" });
  }

  // cek data
  let { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "id harus ada" });
  }

  // get data
  try {
    const result = await sql`SELECT * FROM siswa_al_barokah WHERE id = ${id}`;
    return res.status(200).json({ message: "success", data: result.rows[0] });
  } catch (error) {
    console.error("Error fetching todo:", error.message);
    return res.status(500).json({ error: "Error fetching todo" });
  }
}