import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form, Button, Modal, Pagination, Tabs ,Tab } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import SearchBar from "../components/SearchBar";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

function DaftarPengajar() {
  const router = useRouter();

  const { idDetail } = router.query;

  const [showAllData, setShowAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [mapelOptions, setMapelOptions] = useState([]);
  const [selectedMapel, setSelectedMapel] = useState("");

  const [editData, setEditData] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);

  const [showEdit, setShowEdit] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showCreateTable, setShowCreateTable] = useState(false);
  
  const [newAccount, setNewAccount] = useState({ kode: '', mapel: ''});

  const [selectedSortColumn, setSelectedSortColumn] = useState(""); // Menyimpan kolom yang dipilih untuk sorting

  const [sortDirection, setSortDirection] = useState("ascending");
 
  const searchByOptions = ['kode', 'mapel'];

  useEffect(() => {
    fetch(`/api/get-data-mapel`)
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

  // Fetch semua opsi mapel
  useEffect(() => {
    fetch(`/api/get-data-mapel`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setMapelOptions(data.data); 
        }
      })
      .catch((err) => {
        console.log("Error fetching mapel options:", err.message);
      });
  }, []);

  // Fetch data pengajar sesuai mapel yang dipilih
  useEffect(() => {
    if (!selectedMapel) {
      setFilteredData(showAllData);  // Jika tidak ada mapel yang dipilih, tampilkan semua data
      return;
    }
    fetch(`/api/get-detail-makelpeng-by-name?mapel=${selectedMapel}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setFilteredData(data.data);  // Set data yang terfilter berdasarkan mapel
        } else {
          setFilteredData([]);  // Jika tidak ada data
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err.message);
      });
  }, [selectedMapel, showAllData]);  // Update ketika selectedMapel berubah

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

    fetch(`/api/get-detail-mapel?id=${idDetail}`)
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

    console.log('Creating account with data:', newAccount);

    fetch('/api/insert-data-mapel', {
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
          router.reload()
          alert('Akun berhasil dibuat');
          setShowAllData([...showAllData, data.data]);
          setFilteredData([...filteredData, data.data]);
          setNewAccount({ kode: '', mapel: ''});
          setError('');
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
    fetch(`/api/get-detail-mapel?id=${id}`)
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

    const response = await fetch(`/api/delete-data-mapel`, {
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

    fetch('/api/update-data-mapel', {
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

  // Render
  return (
    <div className="bg-gray-100 flex h-screen">
      <Sidebar className="h-full overflow-hidden" />
      <div className="flex flex-col flex-1">
        <Navbar>Daftar Akun</Navbar>
          
        
        <Tabs 
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
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
                          value="kode"
                          checked={selectedSortColumn === "kode"}
                          onChange={handleCheckboxChange}
                        />{" "}
                        Kode
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          value="mapel"
                          checked={selectedSortColumn === "mapel"}
                          onChange={handleCheckboxChange}
                        />{" "}
                        Mapel
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
                  <p>Mata Pelajaran tidak ada</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="w-full overflow-auto">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="w-1/12 py-2 px-4 border-b border-black">Kode</th>
                            <th className="w-5/12 py-2 px-4 border-b border-x border-black">
                              mapel
                            </th>
                            <th className="w-3/12 py-2 px-4 border-b border-black text-center">
                              #
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedData.map((data, index) => (
                            <tr key={index}>
                              <td className="py-2 px-4 border-black">{data.kode}</td>
                              <td className="py-2 px-4 border-x border-black" >{data.mapel}</td>
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
                          <label>Kode</label>
                          <input
                            type="text"
                            name="kode"
                            value={newAccount.kode}
                            onChange={handleInputChange}
                            className="border py-1 px-2 w-full rounded"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>Mapel</label>
                          <input
                            type="text"
                            name="mapel"
                            value={newAccount.mapel}
                            onChange={handleInputChange}
                            className="border py-1 px-2 w-full rounded"
                            required
                          />
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
                          <label className="ml-1">Kode</label>
                          <input
                            type="text"
                            name="kode"
                            value={editData.kode || ''}
                            onChange={handleEditInputChange}
                            className="border py-1 px-2 w-full rounded"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="ml-1">mapel</label>
                          <input
                            type="text"
                            name="mapel"
                            value={editData.mapel || ''}
                            onChange={handleEditInputChange}
                            className="border py-1 px-2 w-full rounded"
                            required
                          />
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
                        <p><strong>Kode:</strong> {dataDetail.kode}</p>
                        <p><strong>Mapel:</strong> {dataDetail.mapel}</p>
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
      </Tab>
      <Tab eventKey="profile" title="Profile">
      <main className="flex flex-col flex-1 overflow-auto">
          <div className="flex flex-col rounded p-5 gap-4">
            <div className="flex justify-between items-center">
              <button
                className="bg-blue-500 text-white rounded px-3 py-2"
                onClick={() => setShowCreateTable(true)}
              >
                <IoMdAdd />
              </button>
            </div>
            <div className="flex flex-col mt-2">
              <select
                value={selectedMapel}
                onChange={(e) => setSelectedMapel(e.target.value)}  // Set mapel yang dipilih
                className="border py-2 px-4 rounded"
              >
                <option value="">Pilih Mapel</option>
                {mapelOptions.map((mapel) => (
                  <option key={mapel.id} value={mapel.id}>
                    {mapel.mapel}
                  </option>
                ))}
              </select>
            </div>

            {filteredData.length === 0 ? (
              <p>Data tidak ada</p>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="w-full overflow-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="w-1/12 py-2 px-4 border-b border-black">Mapel</th>
                        <th className="w-5/12 py-2 px-4 border-b border-x border-black">Kelas</th>
                        <th className="w-3/12 py-2 px-4 border-b border-x border-black">No WA</th>
                        <th className="w-3/12 py-2 px-4 border-b border-black text-center">#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((data, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-black">{data.mapel}</td>
                          <td className="py-2 px-4 border-x border-black">{data.kelas}</td>
                          <td className="py-2 px-4 border-x border-black text-capitalize">{data.nama}</td>
                          <td className="py-2 px-4 border-black text-center flex items-center justify-center gap-2">
                            <Button variant="primary">
                              <FiAlignJustify />
                            </Button>
                            <Button variant="danger">
                              <FaTrashCan />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
              </div>
            )}
          </div>
        </main>
      </Tab>
    </Tabs>
      </div>
    </div>
  );
}

export default DaftarPengajar;
