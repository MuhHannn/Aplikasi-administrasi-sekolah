import { useRouter } from 'next/router';
import { removeCookies, getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';

export default function AdminPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [dataDetail, setDetail] = useState(null);

    // Get the id from the query parameters
    const { id } = router.query;

    useEffect(() => {
            // Fetch user-specific details if id is available
            if (id) {
                fetch(`/api/get-detail-akun?id=${id}`) // Use backticks for template literals
                    .then((res) => res.json())
                    .then((data) => {
                        if (!data.data) {
                            setDetail(null);
                            alert("Data tidak ditemukan");
                            router.push('/');
                        } else {
                            setDetail(data.data);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                        setDetail(null);
                        router.push('/');
                    });
            }

    }, [id, router]);

    const handleLogout = () => {
        // Remove the cookie
        // removeCookies('username', { path: '/' }); // Ensure the path matches where the cookie is set
        
        // Redirect to login page
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 p-4 text-white text-center">
                <h1 className="text-2xl">Admin Dashboard</h1>
            </header>
            <main className="p-6">
                {dataDetail ? (
                    <div>
                        <h2 className="text-xl mb-4">Welcome, Pengajar {dataDetail.username}!</h2>
                        <p className="mb-4">Here are your details:</p>
                        {/* Display more details if needed */}
                    </div>
                ) : (
                    <p className="text-red-500">Loading...</p>
                )}
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Logout
                </button>
            </main>
        </div>
    );
}
