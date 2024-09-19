import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { username, nama, status, password } = req.body;

  // Validasi: Username hanya boleh berisi angka dan panjang minimal 4 karakter
  if (!/^\d+$/.test(username)) {
    return res.status(400).json({ message: 'Username hanya boleh berisi angka' });
  }

  if (username.length < 4) {
    return res.status(400).json({ message: 'Username harus memiliki panjang minimal 4 karakter' });
  }

  try {
    // Cek apakah username sudah digunakan
    const existingUser = await sql`SELECT * FROM akun_al_barokah WHERE username = ${username}`;

    if (existingUser.rowCount > 0) {
      return res.status(400).json({ message: 'Username sudah terdaftar, harap gunakan username lain' });
    }

    // Proses pembuatan akun
    const newUser = await sql`
      INSERT INTO akun_al_barokah (username, nama, status, password)
      VALUES (${username}, ${nama}, ${status}, ${password})
      RETURNING *;
    `;
    res.status(200).json({ data: newUser.rows[0] });
  } catch (error) {
    console.log('Error inserting data:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat membuat akun' });
  }
}
