import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { id, username, nama, status, password } = req.body;

    if (!id || !username || !status) {
        return res.status(400).json({ error: 'ID, Username, and Status are required' });
    }

    try {
        // Use the utility function to hash and trim the password

        const result = await sql`
            UPDATE akun_al_barokah
            SET 
                username = ${username},
                nama = ${nama},
                status = ${status},
                password = ${password}
            WHERE id = ${id}
        `;

        console.log(result)
        if (result) {
            res.json({ success: true, data: result });
          } else {
            res.json({ success: false, message: 'Gagal memperbarui data' });
          }
    } catch (error) {
        res.status(500).json({ error: 'Error updating account: ' + error.message });
    }
}
