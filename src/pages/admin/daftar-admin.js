import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Form, Button, Modal } from "react-bootstrap";

import { FaTrashCan } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";

import Navbar from "../components/navbar";
import SearchBar from "../components/searchBar";

function Home() {
  const router = useRouter();

  const [showAllData, setShowAllData] = useState([]);
  const [dataDetail, setDetail] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAccount, setNewAccount] = useState({ username: '', status: '', password: '' });

  const { idDetail } = router.query;

  useEffect(() => {
    fetch(`/api/get-data-akun`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setShowAllData(data.data);
          setFilteredData(data.data);
        } else {
          setShowAllData([]);
          setFilteredData([]);
        }
      })
      .catch((err) => {
        alert("Hubungi saya nek error");
        console.log("Gada Data jadinya error", err.message);
      });
  }, []);

  useEffect(() => {
    if (!idDetail) return;

    fetch(`/api/get-detail-akun?id=${idDetail}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.data) {
          setDetail(null);
          alert("Data tidak ditemukan");
        } else {
          setDetail(data.data);
        }
      });
  }, [idDetail]);

  const handleCreateAccount = (event) => {
    event.preventDefault();

    fetch('/api/insert-data-akun', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAccount),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          alert('Akun berhasil dibuat');
          setShowAllData([...showAllData, data.data]);
          setFilteredData([...showAllData, data.data]);
          setNewAccount({ username: '', status: '', password: '' });
        } else {
          alert('Gagal membuat akun');
        }
      })
      .catch((err) => {
        alert('Terjadi kesalahan');
        console.log('Error creating account:', err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleShowDetail = (id) => {
    fetch(`/api/get-detail-akun?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setDetail(data.data);
          setShowModal(true);
        } else {
          alert("Data tidak ditemukan");
        }
      })
      .catch((err) => {
        alert("Terjadi kesalahan");
        console.log(err);
      });
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <main className="flex flex-1 p-5 gap-5">
          <div className="flex flex-col bg-white shadow-lg rounded p-5 h-[400px]"> {/* Set height here */}
            <div className="mb-5">
              <h2 className="text-lg font-semibold mb-3">Buat Akun Baru</h2>
              <Form onSubmit={handleCreateAccount}>
                <div className="mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={newAccount.username}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={newAccount.password}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Status</label>
                  <Form.Group className="flex flex-col">
                    <Form.Check
                      inline
                      label="Admin"
                      type="radio"
                      name="status"
                      value="admin"
                      checked={newAccount.status === 'admin'}
                      onChange={handleInputChange}
                      id="admin"
                    />
                    <Form.Check
                      inline
                      label="Pengajar"
                      type="radio"
                      name="status"
                      value="pengajar"
                      checked={newAccount.status === 'pengajar'}
                      onChange={handleInputChange}
                      id="pengajar"
                    />
                  </Form.Group>
                </div>

                <Button type="submit" className="bg-blue-500 text-white">
                  Buat Akun
                </Button>
              </Form>
            </div>
          </div>

          <div className="flex flex-col flex-1 bg-white shadow-lg rounded max-h-full p-5">
            <div className="flex justify-between p-0 m-0">
              Daftar Akun
            </div>

            <SearchBar data={showAllData} onSearch={setFilteredData} />

            {filteredData.length === 0 && (
              <p className="text-red-500">Data Kosong</p>
            )}
            {filteredData.length > 0 && (
              <div className="w-full overflow-auto">
                <table className="w-full bg-white border-2-b">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border border-slate-600">Id</th>
                      <th className="py-2 px-4 border border-slate-600">Username</th>
                      <th className="py-2 px-4 border border-slate-600">Status</th>
                      <th className="py-2 px-4 border border-slate-600">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((data, index) => (
                      <tr key={index} className="border border-slate-600">
                        <td className="py-2 px-4 border border-slate-600">{data.id}</td>
                        <td className="py-2 px-4 border border-slate-600">{data.username}</td>
                        <td className="py-2 px-4 text-center border border-slate-600 text-capitalize">{data.status}</td>
                        <td className="py-2 px-4 text-center border border-slate-600 flex items-center justify-center gap-2">
                          <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={() => handleShowDetail(data.id)}
                          >
                            <FiAlignJustify />
                          </button>
                          <button
                            className="bg-red-600 text-white p-2 rounded"
                            onClick={() => handleShowDetail(data.id)}
                          >
                            <FaTrashCan />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {showModal && dataDetail && (
              <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Detail Akun</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="flex flex-col">
                    <p><strong>ID:</strong> {dataDetail.id}</p>
                    <p><strong>Username:</strong> {dataDetail.username}</p>
                    <p><strong>Status:</strong> {dataDetail.status}</p>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default daftarAdmin