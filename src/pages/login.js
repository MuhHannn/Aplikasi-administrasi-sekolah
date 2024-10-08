require("dotenv").config({ path: ".env.development.local" });

import { useEffect, useState } from 'react';
import axios from 'axios';
import nookies from 'nookies'
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

function LoginPage ()  {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                username,
                password,
                rememberMe,
            });

            const { status, id, message, usernames, passwords } = response.data;

            // setData({
            //     id: id, 
            //     usernames: usernames, 
            //     passwords: passwords,
            //     status: status
            // })

            if (status === 'admin') {
                router.push(`/admin/dashboard`);
            } else if (status === 'pengajar') {
                router.push(`/pengajar/${id}`);
            } else {
                setMessage('Invalid user status');
            }

            if (rememberMe) {
                // Mendapatkan semua cookie
                const cookies = parseCookies();
                console.log({ cookies });

                // Menghancurkan cookie yang diinginkan
                // destroyCookie(null, 'id', { path: '/' });
                // destroyCookie(null, 'name', { path: '/' });

                setCookie(null, 'id', id, {
                    maxAge: 30 * 24 * 60 * 60, // 30 hari
                    path: '/',
                });
                setCookie(null, 'name', usernames, {
                    maxAge: 30 * 24 * 60 * 60, // 30 hari
                    path: '/',
                });
                setCookie(null, 'password', passwords, {
                    maxAge: 30 * 24 * 60 * 60, // 30 hari
                    path: '/',
                });
                setCookie(null, 'status', status, {
                    maxAge: 30 * 24 * 60 * 60, // 30 hari
                    path: '/',
                });

                // Mendapatkan cookie lagi setelah penyetelan untuk memeriksa
                const newCookies = parseCookies();
                console.log({ newCookies });
            } else {

            }
        } catch (error) {
            console.error('Error during login:', error);
            if (error.response) {
                setMessage(error.response.data.message || 'Error occurred');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold mb-6">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="ml-2 text-gray-700">Remember Me</span>
                        </label>
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </div>
                    {message && <p className="text-red-500 text-xs italic">{message}</p>}
                </form>
            </div>
        </div>
    );
}

export default LoginPage