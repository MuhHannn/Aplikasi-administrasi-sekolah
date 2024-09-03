import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  // cek method
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  // cek data
  let { id, kode, nama, kelamin, nomer_wa } = await req.body;

  if (!id) {
    return res.status(400).json({ error: "id harus ada" });
  }

  // ubah data
  const resData =
    await sql`update pengajar_al_barokah set kode=${kode}, nama=${nama}, kelamin=${kelamin}, ${nomer_wa} where id=${id} `;

  // beritahu klo success
  return res.status(200).json({ message: "updated", data: resData });
}