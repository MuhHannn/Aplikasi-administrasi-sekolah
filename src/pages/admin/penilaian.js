import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

function Penilaian() {
    return (
        <div className="bg-gray-100 flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 bg-gray-100">
                    {/* Your main content goes here */}
                </main>
            </div>
        </div>
    );
}

export default Penilaian
