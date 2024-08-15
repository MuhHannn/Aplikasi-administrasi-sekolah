import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  let { mapel, pengajar, kelas } = await req.body;

  if (!mapel || !pengajar || !kelas) {
    return res.status(400).json({ error: "data harus diisi" });
  }

  const resData =
    await sql`INSERT INTO mapel_al_barokah (mapel, pengajar, kelas)
  VALUES (${mapel}, ${pengajar}, ${kelas})`;

  return res.status(200).json({ message: "saved", data: resData });
}