import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { parseCookies, setCookie } from 'nookies';
import Navbar from "./components/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountPage = () => {
    const cookies = parseCookies();
    const router = useRouter();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [password, setPassword] = useState('');
    const [newName, setNewName] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setId(cookies.id || '');
        setName(cookies.name || '');
        setStatus(cookies.status || '');
        setPassword(cookies.password || ''); // Menampilkan password asli
    }, [cookies]);

    const handleShowDetail = () => {
        setNewName(name);
        setNewStatus(status);
        setNewPassword(password); // Menampilkan password asli di modal
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'newName') setNewName(value);
        else if (name === 'newStatus') setNewStatus(value);
        else if (name === 'newPassword') setNewPassword(value);
    };

    const handleSubmit = async () => {
        const response = await fetch('/api/update-data-akun', {
            method: 'PUT', // Ensure this is PUT
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                username: newName,
                status: newStatus,
                password: newPassword, // Mengirim password yang telah diubah
            }),
        });

        if (response.ok) {
            setCookie(null, 'name', newName, { path: '/' });
            setCookie(null, 'status', newStatus, { path: '/' });
            setCookie(null, 'password', newPassword, { path: '/' });
            setShowModal(false);
        } else {
            alert('Error updating account');
        }
    };

    return (
        <div className='bg-gray-100 flex flex-col min-h-screen items-center'>
            <Navbar />

            <div className='flex flex-col flex-1 w-5/12 bg-white shadow-lg rounded p-5 m-5 gap-5'>
                <div className='text-center'>
                    <h1>Akun Anda</h1>
                </div>
                <div className='flex flex-col items-center gap-3'>
                    <div className='flex items-center gap-5'>
                        <div className='w-full'>
                            <p>ID</p>
                            <p>Username</p>
                            <p>Status</p>
                            <p>Password</p>
                        </div>
                        <div className='w-full text-center'>
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                        </div>
                        <div className='w-full flex flex-col capitalize'>
                            <p>{id}</p>
                            <p>{name}</p>
                            <p>{status}</p>
                            <p>************</p> {/* Menampilkan password asli */}
                        </div>
                    </div>
                    <div>
                        <button className='py-2 px-3 bg-green-600 rounded text-white' onClick={handleShowDetail}>Ubah</button>
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Ubah Akun</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="newName"
                                    value={newName}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        label="Admin"
                                        type="radio"
                                        name="newStatus"
                                        value="admin"
                                        checked={newStatus === 'admin'}
                                        onChange={handleInputChange}
                                    />
                                    <Form.Check
                                        inline
                                        label="Pengajar"
                                        type="radio"
                                        name="newStatus"
                                        value="pengajar"
                                        checked={newStatus === 'pengajar'}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Konfirmasi
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default AccountPage;
