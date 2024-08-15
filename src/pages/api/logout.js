// api/logout.js

import { deleteCookie } from 'cookies-next';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    deleteCookie('username', { req, res });
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
