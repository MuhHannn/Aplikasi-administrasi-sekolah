import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  // cek method
  if (req.method !== "GET") {
    return res.status(405).json({ error: "method not allowed" });
  }

  // get data
  const resData = await sql`SELECT * FROM mapel_kelas_pengajar_al_barokah`;

  // beritahu klo success
  return res.status(200).json({ message: "success", data: resData.rows });
}