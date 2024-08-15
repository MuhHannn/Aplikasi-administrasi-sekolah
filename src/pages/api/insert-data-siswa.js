import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  let { nama, kelas } = await req.body;

  if (!nama) {
    return res.status(400).json({ error: "data harus diisi" });
  }

  const resData =
    await sql`INSERT INTO siswa_al_barokah (nama, kelas)
  VALUES (${nama}, ${kelas})`;

  return res.status(200).json({ message: "saved", data: resData });
}