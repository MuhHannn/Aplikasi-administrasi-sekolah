import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  // cek method
  if (req.method !== "GET") {
    return res.status(405).json({ error: "method not allowed" });
  }

  // cek data
  let { mapel } = req.query;

  if (!mapel) {
    return res.status(400).json({ error: "id harus ada" });
  }

  // get data
  try {
    const result = await sql`
      SELECT 
        mapel_kelas_pengajar_al_barokah.id,
        mapel_al_barokah.mapel, 
        kelas_al_barokah.kelas, 
        pengajar_al_barokah.nama 
      FROM 
        mapel_kelas_pengajar_al_barokah
      JOIN 
        mapel_al_barokah ON mapel_kelas_pengajar_al_barokah.mapel = mapel_al_barokah.id
      JOIN 
        kelas_al_barokah ON mapel_kelas_pengajar_al_barokah.kelas = kelas_al_barokah.id
      JOIN 
        pengajar_al_barokah ON mapel_kelas_pengajar_al_barokah.pengajar = pengajar_al_barokah.id
      WHERE 
        mapel_kelas_pengajar_al_barokah.mapel = ${mapel}`;

    return res.status(200).json({ message: "success", data: result.rows });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return res.status(500).json({ error: "Error fetching data" });
  }
}
