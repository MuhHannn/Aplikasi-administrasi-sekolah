import { sql } from "@vercel/postgres";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username,nama,  status, password } = req.body;

    if (!username || !nama || !status || !password) {
      return res.status(400).json({ message: 'Semua data harus diisi' });
    }

    // Validasi status
    if (status !== 'admin' && status !== 'pengajar') {
      return res.status(400).json({ message: 'Status tidak valid' });
    }

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const shortenedHash = hashedPassword.substring(0, 12);  

      // Insert data ke database
      const result = await sql`
        INSERT INTO akun_al_barokah (username, nama, password, status)
        VALUES (${username}, ${nama}, ${shortenedHash}, ${status})
        RETURNING *;
      `;

      // Pastikan data yang dikembalikan ada
      if (result.rowCount === 0) {
        return res.status(500).json({ message: 'Gagal menyimpan data' });
      }

      res.status(201).json({ data: result.rows[0] });
    } catch (err) {
      console.error('Error creating account:', err);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
