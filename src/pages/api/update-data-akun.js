// Misalkan kita menggunakan PostgreSQL
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { id, username, nama, status, password } = req.body;

  // Validasi: Username harus hanya berisi angka dan minimal 4 karakter
  if (!/^\d+$/.test(username)) {
    return res.status(400).json({ message: 'Username hanya boleh berisi angka' });
  }

  if (username.length < 4) {
    return res.status(400).json({ message: 'Username harus memiliki panjang minimal 4 karakter' });
  }

  try {
    // Cek apakah username sudah digunakan oleh akun lain
    const existingUser = await sql`SELECT * FROM akun WHERE username = ${username}`;

    if (existingUser.rowCount > 0) {
      return res.status(400).json({ message: 'Username sudah terdaftar, harap gunakan username lain' });
    }

    // Proses update akun
    const updatedUser = await sql`
      UPDATE akun 
      SET username = ${username}, nama = ${nama}, status = ${status}, password = ${password}
      WHERE id = ${id}
      RETURNING *;
    `;
    res.status(200).json({ data: updatedUser.rows[0] });
  } catch (error) {
    console.log('Error updating data:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengedit akun' });
  }
}
