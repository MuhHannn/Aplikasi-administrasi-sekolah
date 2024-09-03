import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed, only POST requests are allowed" });
  }

  try {
    let { nisn, nis, nama, kelamin, tempat_lahir, tanggal_lahir, kelas } = req.body;

    if (!nama || !nis || !kelas) {
      return res.status(400).json({ error: "All fields (nama, nis, kelas) are required" });
    }

    const result = await sql`
      INSERT INTO siswa_al_barokah (nisn, nis, nama, kelamin, tanggal_lahir, tempat_lahir, kelas)
      VALUES (${nisn}, ${nis}, ${nama}, ${kelamin}, ${tanggal_lahir}, ${tempat_lahir}, ${kelas})
      RETURNING *;
    `;

    return res.status(200).json({ message: "saved", data: result.rows[0] });
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
