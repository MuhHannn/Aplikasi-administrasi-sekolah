import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form, Button, Modal, Pagination } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

function DaftarAkun() {
  const router = useRouter();

  const { idDetail } = router.query;

  const [showAllData, setShowAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [editData, setEditData] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);

  const [showEdit, setShowEdit] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showCreateTable, setShowCreateTable] = useState(false);
  
  const [newAccount, setNewAccount] = useState({ username: '', nama: '', status: '', password: '' });

  const [statusError, setStatusError] = useState('');
  const [selectedSortColumn, setSelectedSortColumn] = useState(""); // Menyimpan kolom yang dipilih untuk sorting

  const [sortDirection, setSortDirection] = useState("ascending");
 
  const searchByOptions = ['kode', 'username', 'status'];

  useEffect(() => {
    fetch(`/api/get-data-akun`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setShowAllData(data.data);
          setFilteredData(data.data);
        }
      })
      .catch((err) => {
        console.log("Error:", err.message);
      });
  }, []);

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


  // Sorting Data
  useEffect(() => {
    if (selectedSortColumn) {
      const sortedData = [...filteredData].sort((a, b) => {
        if (a[selectedSortColumn] < b[selectedSortColumn]) {
          return sortDirection === "ascending" ? -1 : 1;
        }
        if (a[selectedSortColumn] > b[selectedSortColumn]) {
          return sortDirection === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setFilteredData(sortedData);
    }
  }, [selectedSortColumn, sortDirection]);

  const handleSort = () => {
    if (selectedSortColumn) {
      const sortedData = [...filteredData].sort((a, b) => {
        if (a[selectedSortColumn] < b[selectedSortColumn]) {
          return sortDirection === "ascending" ? -1 : 1;
        }
        if (a[selectedSortColumn] > b[selectedSortColumn]) {
          return sortDirection === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setFilteredData(sortedData);
    }
  };

  const toggleSortDirection = () => {
    const newDirection = sortDirection === "ascending" ? "descending" : "ascending";
    setSortDirection(newDirection);
    handleSort();
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setSelectedSortColumn(value); // Tidak perlu memanggil handleSort di sini
  };


  // Detail Account
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


  // Create Account
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


  // Delete Accout
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
          alert('Data berhasil diperbarui');
          // Update the state with the new data
          setShowAllData(showAllData.map(item => item.id === editData.id ? data.data : item));
          setFilteredData(filteredData.map(item => item.id === editData.id ? data.data : item));
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


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 26;

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-100 flex h-screen">
      <Sidebar className="h-full overflow-hidden" />
      <div className="flex flex-col flex-1">
        <Navbar>Daftar Akun</Navbar>
        <main className="flex flex-col flex-1 overflow-auto">
          <div className="flex flex-col rounded p-5 gap-4">
            <div className="flex justify-between items-center">
              <div className="w-8/12 p-0 m-0">
                <SearchBar 
                  data={showAllData} 
                  onSearch={setFilteredData} 
                  searchByOptions={searchByOptions} 
                />
              </div>
              <button
                className="bg-blue-500 text-white rounded px-3 py-2"
                onClick={() => setShowCreateTable(true)}
              >
                <IoMdAdd />
              </button>
            </div>
            <div className="flex flex-col mt-2">
              <label>
                Urutkan:
              </label>
              <div className="flex gap-4 items-center">
                <div>
                  <label>
                    <input
                      type="radio"
                      value="username"
                      checked={selectedSortColumn === "username"}
                      onChange={handleCheckboxChange}
                    />{" "}
                    User
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="nama"
                      checked={selectedSortColumn === "nama"}
                      onChange={handleCheckboxChange}
                    />{" "}
                    Nama
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="status"
                      checked={selectedSortColumn === "status"}
                      onChange={handleCheckboxChange}
                    />{" "}
                    Status
                  </label>
                </div>
                <div>
                  <Button onClick={toggleSortDirection}>
                    {sortDirection === "ascending" ? <FaArrowDown /> : <FaArrowUp />}
                  </Button>
                </div>
              </div>
            </div>
            {filteredData.length === 0 ? (
              <p>Akun tidak ada</p>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="w-full overflow-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="w-1/12 py-2 px-4 border-b border-black">User</th>
                        <th className="w-5/12 py-2 px-4 border-b border-x border-black">
                          Nama
                        </th>
                        <th className="w-3/12 py-2 px-4 border-b border-x border-black">
                          Status
                        </th>
                        <th className="w-3/12 py-2 px-4 border-b border-black text-center">
                          #
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((data, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-black">{data.username}</td>
                          <td className="py-2 px-4 border-x border-black">{data.nama}</td>
                          <td className="py-2 px-4 border-x border-black text-capitalize">
                            {data.status}
                          </td>
                          <td className="py-2 px-4 border-black text-center flex items-center justify-center gap-2">
                            <Button
                              variant="primary"
                              onClick={() => handleShowDetail(data.id)}
                            >
                              <FiAlignJustify />
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleDeleteAccount(data.id)}
                            >
                              <FaTrashCan />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-center items-center">
                  <Pagination>
                    <Pagination.First
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                    />
                    <Pagination.Prev
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    />
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
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
                      <label>User</label>
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
                  <Form onSubmit={handleSaveChanges} className="mb-1 mx-1">
                    <div className="mb-3">
                      <label className="ml-1">User</label>
                      <input
                        type="text"
                        name="username"
                        value={editData.username || ''}
                        onChange={handleEditInputChange}
                        className="border py-1 px-2 w-full rounded"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="ml-1">Nama</label>
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
                      <label className="ml-1">Status</label>
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
                  <div className="flex flex-col capitalize">
                    <p><strong>ID:</strong> {dataDetail.id}</p>
                    <p><strong>User:</strong> {dataDetail.username}</p>
                    <p><strong>Nama:</strong> {dataDetail.nama}</p>
                    <p><strong>Status:</strong> {dataDetail.status}</p>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={() => {
                    setShowEdit(true);
                    setShowDetail(false)
                    setEditData({ ...dataDetail });
                  }}>
                    Edit
                  </Button>
                  <Button variant="secondary" onClick={() => setShowDetail(false)}>
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

export default DaftarAkun;
