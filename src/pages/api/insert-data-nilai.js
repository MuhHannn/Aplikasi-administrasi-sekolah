import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  let { siswa, mapel, nilai, kelas } = await req.body;

  if (!siswa || !mapel || !nilai || !kelas) {
    return res.status(400).json({ error: "data harus diisi" });
  }

  const resData =
    await sql`INSERT INTO nilai_al_barokah (siswa, mapel, nilai, kelas)
  VALUES (${siswa}, ${mapel}, ${nilai}, ${kelas})`;

  return res.status(200).json({ message: "saved", data: resData });
}