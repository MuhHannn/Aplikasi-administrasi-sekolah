import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

function DaftarAdmin() {
  const router = useRouter();
  const [showAllData, setShowAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataDetail, setDataDetail] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showCreateTable, setShowCreateTable] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [newAccount, setNewAccount] = useState({ username: '', nama: '', status: '', password: '' });
  const [editData, setEditData] = useState(null);
  const [statusError, setStatusError] = useState('');
  const { idDetail } = router.query;

  useEffect(() => {
    fetch(`/api/get-data-akun`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Data fetched for all accounts:', data);
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
        console.log('Data fetched for account details:', data);
        if (!data.data) {
          setDataDetail(null);
          alert("Data tidak ditemukan");
        } else {
          setDataDetail(data.data);
          setEditData({ ...data.data });
        }
      });
  }, [idDetail]);

  const handleCreateAccount = (event) => {
    event.preventDefault();

    if (!newAccount.status) {
      setStatusError('Status harap diisi');
      return;
    }

    console.log('Creating account with data:', newAccount);

    fetch('/api/insert-data-akun', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAccount),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Response from create account:', data);
        if (data.data) {
          alert('Akun berhasil dibuat');
          setShowAllData([...showAllData, data.data]);
          setFilteredData([...filteredData, data.data]);
          setNewAccount({ username: '', nama: '', status: '', password: '' });
          setStatusError('');
          setShowCreateTable(false);
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
        console.log('Detail data fetched:', data);
        if (data.data) {
          setDataDetail(data.data);
          setEditData({ ...data.data });
          setShowDetail(true);
        } else {
          alert("Data tidak ditemukan");
        }
      })
      .catch((err) => {
        alert("Terjadi kesalahan");
        console.log(err);
      });
  };

  const handleDeleteAccount = async (id) => {
    event.preventDefault();

    console.log('Deleting account with ID:', id);

    const response = await fetch(`/api/delete-data-akun`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();
    console.log('Delete response:', result);

    if (response.ok) {
      alert("Akun berhasil dihapus");

      // Remove the deleted account from the state
      const updatedData = showAllData.filter((item) => item.id !== id);
      setShowAllData(updatedData);
      setFilteredData(updatedData);
    } else {
      alert("Gagal menghapus akun");
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value || '', // Ensure no undefined values
    }));
  };

  const handleSaveChanges = (event) => {
    event.preventDefault();
  
    if (!editData) {
      alert("Tidak ada data yang akan diperbarui");
      return;
    }
  
    console.log('Saving changes with data:', editData);
  
    fetch('/api/update-data-akun', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Response from update account:', data);
        if (data.data) {
          router.reload()
          // alert('Data berhasil diperbarui');
          // Update the state with the new data
          setShowAllData((prevData) => 
            prevData.map(item => item.id === editData.id ? data.data : item)
          );
          setFilteredData((prevData) => 
            prevData.map(item => item.id === editData.id ? data.data : item)
          );
          setShowEdit(false);
          setDataDetail(data.data);
        } else {
          alert('Gagal memperbarui data: ' + data.message);
        }
      })
      .catch((err) => {
        alert('Terjadi kesalahan: ' + err.message);
        console.log('Error updating account:', err);
      });
  };
  

  return (
    <div className="bg-gray-100 flex">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar>Daftar Akun</Navbar>

        <main className="flex flex-col flex-1">
          <div className="flex flex-col rounded p-5 gap-4">
            <div className="flex justify-between items-center">
              <div className="w-8/12 p-0 m-0">
                <SearchBar data={showAllData} onSearch={setFilteredData}>Cari sesuai nama</SearchBar>
              </div>
              <div>
                <button
                  className="bg-blue-500 text-white rounded px-3 py-2"
                  onClick={() => setShowCreateTable(true)}
                >
                  <IoMdAdd />
                </button>
              </div>
            </div>

            {filteredData.length === 0 && (
              <p>Akun tidak ada</p>
            )}
            {filteredData.length > 0 && (
              <div className="w-full overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="w-1/12 py-2 px-4 border-b border-black">User</th>
                      <th className="w-5/12 py-2 px-4 border-b border-x border-black">Nama</th>
                      <th className="w-3/12 py-2 px-4 border-b border-x border-black">Status</th>
                      <th className="w-3/12 py-2 px-4 border-b border-black text-center">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((data, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-black">{data.username}</td>
                        <td className="py-2 px-4 border-x border-black">{data.nama}</td>
                        <td className="py-2 px-4 border-x border-black text-capitalize">{data.status}</td>
                        <td className="py-2 px-4 border-black text-center flex items-center justify-center gap-2">
                          <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={() => handleShowDetail(data.id)}
                          >
                            <FiAlignJustify />
                          </button>
                          <button
                            className="bg-red-500 text-white p-2 rounded"
                            onClick={() => handleDeleteAccount(data.id)}
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

            {showCreateTable && (
              <Modal show={showCreateTable} onHide={() => setShowCreateTable(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Buat Akun Baru</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleCreateAccount}>
                    <div className="mb-3">
                      <label>Username</label>
                      <input
                        type="text"
                        name="username"
                        value={newAccount.username}
                        onChange={handleInputChange}
                        className="border py-1 px-2 w-full rounded"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Nama</label>
                      <input
                        type="text"
                        name="nama"
                        value={newAccount.nama}
                        onChange={handleInputChange}
                        className="border py-1 px-2 w-full rounded"
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
                        className="border py-1 px-2 w-full rounded"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="mb-2">Status</label>
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
                          required
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
                          required
                        />
                      </Form.Group>
                      {statusError && <p className="text-red-500">{statusError}</p>}
                    </div>
                    <Button type="submit" className="bg-blue-500 text-white">
                      Buat Akun
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            )}

            {showEdit && editData && (
              <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Akun</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSaveChanges}>
                    <div className="mb-3">
                      <label>Username</label>
                      <input
                        type="text"
                        name="username"
                        value={editData.username || ''}
                        onChange={handleEditInputChange}
                        className="border py-1 px-2 w-full rounded"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Nama</label>
                      <input
                        type="text"
                        name="nama"
                        value={editData.nama || ''}
                        onChange={handleEditInputChange}
                        className="border py-1 px-2 w-full rounded"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        value={editData.password || ''}
                        onChange={handleEditInputChange}
                        className="border py-1 px-2 w-full rounded"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="mb-2">Status</label>
                      <Form.Group className="flex flex-col">
                        <Form.Check
                          inline
                          label="Admin"
                          type="radio"
                          name="status"
                          value="admin"
                          checked={editData.status === 'admin'}
                          onChange={handleEditInputChange}
                          id="admin-edit"
                          required
                        />
                        <Form.Check
                          inline
                          label="Pengajar"
                          type="radio"
                          name="status"
                          value="pengajar"
                          checked={editData.status === 'pengajar'}
                          onChange={handleEditInputChange}
                          id="pengajar-edit"
                          required
                        />
                      </Form.Group>
                    </div>
                    <Button type="submit" className="bg-blue-500 text-white">
                      Simpan Perubahan
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            )}

            {showDetail && dataDetail && (
              <Modal show={showDetail} onHide={() => setShowDetail(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Detail Akun</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="flex flex-col">
                    <p><strong>ID:</strong> {dataDetail.id}</p>
                    <p><strong>Username:</strong> {dataDetail.username}</p>
                    <p><strong>Nama:</strong> {dataDetail.nama}</p>
                    <p><strong>Status:</strong> {dataDetail.status}</p>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowDetail(false)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => {
                    setShowEdit(true);
                    setEditData({ ...dataDetail });
                  }}>
                    Edit
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

export default DaftarAdmin;
