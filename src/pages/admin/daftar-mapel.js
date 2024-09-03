import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

function DaftarMapel() {
  const router = useRouter();
  const [showAllData, setShowAllData] = useState([]);
  const [dataDetail, setDetail] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [showCreateTable, setShowCreateTable] = useState(false);
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [loading, setLoading] = useState(false); // New loading state for create form
  const [editLoading, setEditLoading] = useState(false); // New loading state for edit form
  const [newMapel, setNewMapel] = useState({
    kode: '',
    mapel: '',
    pengajar: '',
    kelas: ''
  });
  const [editMapel, setEditMapel] = useState({
    kode: '',
    mapel: '',
    pengajar: '',
    kelas: ''
  }); // New state for edit form
  const [kelasOptions, setKelasOptions] = useState([]);
  const [pengajarOptions, setPengajarOptions] = useState([]);
  const [kelasMap, setKelasMap] = useState({});
  const [pengajarMap, setPengajarMap] = useState({});
  const { idDetail } = router.query;

  useEffect(() => {
    fetch(`/api/get-data-mapel`)
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
        alert("Hubungi saya jika ada error");
        console.log("Error fetching mapel data", err.message);
      });
  }, []);

  useEffect(() => {
    if (!idDetail) return;

    fetch(`/api/get-detail-mapel?id=${idDetail}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.data) {
          setDetail(null);
          alert("Data tidak ditemukan");
        } else {
          setDetail(data.data);
          setEditMapel(data.data); // Set edit form state with detail data
        }
      });
  }, [idDetail]);

  useEffect(() => {
    fetch(`/api/get-data-kelas`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const map = data.data.reduce((acc, kelas) => {
            acc[kelas.id] = kelas.kelas;
            return acc;
          }, {});
          setKelasOptions(data.data);
          setKelasMap(map);
        } else {
          setKelasOptions([]);
          setKelasMap({});
        }
      })
      .catch((err) => {
        console.log("Error fetching class data", err.message);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/get-data-pengajar`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const map = data.data.reduce((acc, pengajar) => {
            acc[pengajar.id] = pengajar.nama;
            return acc;
          }, {});
          setPengajarOptions(data.data);
          setPengajarMap(map);
        } else {
          setPengajarOptions([]);
          setPengajarMap({});
        }
      })
      .catch((err) => {
        console.log("Error fetching teacher data", err.message);
      });
  }, []);

  const handleCreateMapel = (event) => {
    event.preventDefault();
    setLoading(true);

    fetch('/api/insert-data-mapel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMapel),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.data) {
          router.reload();
          alert('Mapel berhasil dibuat');
          setShowAllData([...showAllData, data.data]);
          setFilteredData([...showAllData, data.data]);
          setNewMapel({
            kode: '',
            mapel: '',
            pengajar: '',
            kelas: ''
          });
        } else {
          alert('Gagal membuat mapel');
        }
      })
      .catch((err) => {
        setLoading(false);
        alert('Terjadi kesalahan');
        console.log('Error creating mapel:', err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMapel({ ...newMapel, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditMapel({ ...editMapel, [name]: value });
  };

  const handleShowDetail = (id) => {
    fetch(`/api/get-detail-mapel?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setDetail(data.data);
          setEditMapel(data.data); // Set edit form state with detail data
          setShowDetail(true);
          setEditMode(false); // Ensure the modal opens in view mode
        } else {
          alert("Data tidak ditemukan");
        }
      })
      .catch((err) => {
        alert("Terjadi kesalahan");
        console.log(err);
      });
  };

  const handleDeleteMapel = async (id) => {
    event.preventDefault();

    const response = await fetch(`/api/delete-data-mapel`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      alert("Mapel berhasil dihapus");

      const updatedData = showAllData.filter((item) => item.id !== id);
      setShowAllData(updatedData);
      setFilteredData(updatedData);
    } else {
      alert("Gagal menghapus mapel");
    }
  };

  const handleEditMapel = (event) => {
    event.preventDefault();
    setEditLoading(true);

    fetch(`/api/update-data-mapel`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editMapel),
    })
      .then((res) => res.json())
      .then((data) => {
        setEditLoading(false);
        if (data.data) {
          alert('Mapel berhasil diperbarui');
          const updatedData = showAllData.map((item) =>
            item.id === data.data.id ? data.data : item
          );
          setShowAllData(updatedData);
          setFilteredData(updatedData);
          setShowDetail(false);
        } else {
          alert('Gagal memperbarui mapel');
        }
      })
      .catch((err) => {
        setEditLoading(false);
        alert('Terjadi kesalahan');
        console.log('Error updating mapel:', err);
      });
  };

  return (
    <div className="bg-gray-100 flex">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar>Daftar Mapel</Navbar>

        <main className="flex flex-col flex-1">
          <div className="flex flex-col rounded p-5 gap-4">
            <div className="flex justify-between items-center">
              <div className="w-8/12 p-0 m-0">
                <SearchBar data={showAllData} onSearch={setFilteredData}>
                  Cari sesuai nama mapel
                </SearchBar>
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

            {filteredData.length === 0 && <p>Mapel tidak ada</p>}
            {filteredData.length > 0 && (
              <div className="w-full overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="w-1/12 py-2 px-4 border-b border-black">Kode</th>
                      <th className="w-4/12 py-2 px-4 border-b border-black">Nama Mapel</th>
                      <th className="w-3/12 py-2 px-4 border-b border-black">Pengajar</th>
                      <th className="w-2/12 py-2 px-4 border-b border-black">Kelas</th>
                      <th className="w-2/12 py-2 px-4 border-b border-black">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((data) => (
                      <tr key={data.id}>
                        <td className="text-center py-2 px-4 border-b border-black">{data.kode}</td>
                        <td className="text-left py-2 px-4 border-b border-black">{data.mapel}</td>
                        <td className="text-left py-2 px-4 border-b border-black">
                          {pengajarMap[data.pengajar] || 'Tidak Diketahui'}
                        </td>
                        <td className="text-center py-2 px-4 border-b border-black">
                          {kelasMap[data.kelas] || 'Tidak Diketahui'}
                        </td>
                        <td className="text-center py-2 px-4 border-b border-black flex items-center justify-center gap-3">
                          <button
                            className="bg-yellow-400 text-white rounded px-3 py-2"
                            onClick={() => handleShowDetail(data.id)}
                          >
                            <FiAlignJustify />
                          </button>
                          <button
                            className="bg-red-500 text-white rounded px-3 py-2"
                            onClick={() => handleDeleteMapel(data.id)}
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
          </div>
        </main>

        <Modal show={showCreateTable} onHide={() => setShowCreateTable(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Buat Mapel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateMapel}>
              <Form.Group controlId="formKode">
                <Form.Label>Kode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan kode"
                  name="kode"
                  value={newMapel.kode}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formMapel">
                <Form.Label>Mapel</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama mapel"
                  name="mapel"
                  value={newMapel.mapel}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formPengajar">
                <Form.Label>Pengajar</Form.Label>
                <Form.Control
                  as="select"
                  name="pengajar"
                  value={newMapel.pengajar}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih Pengajar</option>
                  {pengajarOptions.map((pengajar) => (
                    <option key={pengajar.id} value={pengajar.id}>
                      {pengajar.nama}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formKelas">
                <Form.Label>Kelas</Form.Label>
                <Form.Control
                  as="select"
                  name="kelas"
                  value={newMapel.kelas}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih Kelas</option>
                  {kelasOptions.map((kelas) => (
                    <option key={kelas.id} value={kelas.id}>
                      {kelas.kelas}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="mt-3"
                disabled={loading} // Disable button when loading
              >
                {loading ? "Memuat..." : "Buat"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showDetail} onHide={() => setShowDetail(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editMode ? 'Edit Mapel' : 'Detail Mapel'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editMode ? (
              <Form onSubmit={handleEditMapel}>
                <Form.Group controlId="formKode">
                  <Form.Label>Kode</Form.Label>
                  <Form.Control
                    type="text"
                    name="kode"
                    value={editMapel.kode}
                    onChange={handleEditInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formMapel">
                  <Form.Label>Mapel</Form.Label>
                  <Form.Control
                    type="text"
                    name="mapel"
                    value={editMapel.mapel}
                    onChange={handleEditInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPengajar">
                  <Form.Label>Pengajar</Form.Label>
                  <Form.Control
                    as="select"
                    name="pengajar"
                    value={editMapel.pengajar}
                    onChange={handleEditInputChange}
                  >
                    <option value="">Pilih Pengajar</option>
                    {pengajarOptions.map((pengajar) => (
                      <option key={pengajar.id} value={pengajar.id}>
                        {pengajar.nama}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formKelas">
                  <Form.Label>Kelas</Form.Label>
                  <Form.Control
                    as="select"
                    name="kelas"
                    value={editMapel.kelas}
                    onChange={handleEditInputChange}
                  >
                    <option value="">Pilih Kelas</option>
                    {kelasOptions.map((kelas) => (
                      <option key={kelas.id} value={kelas.id}>
                        {kelas.kelas}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3"
                  disabled={editLoading} // Disable button when loading
                >
                  {editLoading ? "Memuat..." : "Simpan"}
                </Button>
              </Form>
            ) : (
              dataDetail && (
                <div>
                  <p><strong>Kode:</strong> {dataDetail.kode}</p>
                  <p><strong>Mapel:</strong> {dataDetail.mapel}</p>
                  <p><strong>Pengajar:</strong> {pengajarMap[dataDetail.pengajar] || "Tidak Diketahui"}</p>
                  <p><strong>Kelas:</strong> {kelasMap[dataDetail.kelas] || "Tidak Diketahui"}</p>
                </div>
              )
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetail(false)}>
              Tutup
            </Button>
            {!editMode && (
              <Button variant="primary" onClick={() => setEditMode(true)}>
                Edit
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default DaftarMapel;
