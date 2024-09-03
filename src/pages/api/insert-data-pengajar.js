import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  let { kode, nama, kelamin, nomer_wa } = await req.body;

  if (!nama) {
    return res.status(400).json({ error: "data harus diisi" });
  }

  const resData =
    await sql`INSERT INTO pengajar_al_barokah (kode, nama, kelamin, nomer_wa)
  VALUES (${kode}, ${nama}, ${kelamin}, ${nomer_wa})`;

  return res.status(200).json({ message: "saved", data: resData });
}