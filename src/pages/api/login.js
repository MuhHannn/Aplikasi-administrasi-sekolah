require("dotenv").config({ path: ".env.development.local" });
const { sql } = require("@vercel/postgres");
const bcrypt = require('bcrypt');
const { serialize } = require('cookie');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, password, rememberMe } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const result = await sql`SELECT * FROM akun_al_barokah WHERE username = ${username}`;

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const cookieOptions = {
            httpOnly: true,
            sameSite: 'lax',
            path: '/' // Cookie will be available site-wide
        };

        if (rememberMe) {
            cookieOptions.maxAge = 60 * 60 * 24 * 30; // 30 days
        } else {
            cookieOptions.maxAge = 60 * 60 * 24; // 1 day
        }

        const cookie = serialize('username', username, cookieOptions);
        res.setHeader('Set-Cookie', cookie);

        res.status(200).json({ 
            message: 'Login successful',
            status: user.status,
            id: user.id,
            usernames: user.username,
            passwords: user.password
        });
    } catch (error) {
        console.error('Error during login process:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}