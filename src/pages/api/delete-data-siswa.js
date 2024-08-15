import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  // cek method
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "method not allowed" });
  }

  // cek data
  let { id } = await req.body;

  if (!id) {
    return res.status(400).json({ error: "id harus ada" });
  }

  // delete data
  const resData = await sql`delete from siswa_al_barokah where id=${id}`;

  // beritahu klo success
  return res.status(200).json({ message: "deleted", data: resData });
}