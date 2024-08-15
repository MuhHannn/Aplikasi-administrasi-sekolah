import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  // cek method
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "method not allowed" });
  }

  // cek data
  let { id, nama, status } = await req.body;

  if (!id) {
    return res.status(400).json({ error: "id harus ada" });
  }

  // ubah data
  const resData =
    await sql`update karyawan_al_barokah set nama=${nama}, status=${status} where id=${id} `;

  // beritahu klo success
  return res.status(200).json({ message: "updated", data: resData });
}