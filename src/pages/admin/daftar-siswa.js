import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

function DaftarSiswa() {
  const router = useRouter();
  const [showAllData, setShowAllData] = useState([]);
  const [dataDetail, setDetail] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [showCreateTable, setShowCreateTable] = useState(false);
  const [newAccount, setNewAccount] = useState({
    nisn: '',
    nis: '',
    nama: '',
    kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    kelas: '',
  });
  const [kelaminError, setKelaminError] = useState('');
  const [kelasOptions, setKelasOptions] = useState([]);
  const [kelasMap, setKelasMap] = useState({}); // Untuk menyimpan mapping ID ke nama kelas
  const { idDetail } = router.query;

  // Ambil data semua siswa
  useEffect(() => {
    fetch(`/api/get-data-siswa`)
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

  // Ambil detail data siswa
  useEffect(() => {
    if (!idDetail) return;

    fetch(`/api/get-detail-siswa?id=${idDetail}`)
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

  // Ambil data kelas dari tabel kelas_al_barokah
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
          setKelasMap(map); // Simpan mapping ID ke nama kelas
        } else {
          setKelasOptions([]);
          setKelasMap({});
        }
      })
      .catch((err) => {
        console.log("Error fetching class data", err.message);
      });
  }, []);

  // Handle pengiriman form untuk membuat siswa baru
  const handleCreateAccount = (event) => {
    event.preventDefault();
  
    // Cek apakah semua field yang dibutuhkan sudah diisi
    if (!newAccount.kelamin || !newAccount.kelas || !newAccount.tempat_lahir || !newAccount.tanggal_lahir) {
      setKelaminError('Kelamin, kelas, tempat lahir, dan tanggal lahir harap diisi');
      return;
    }
  
    // Log newAccount state sebelum mengirim request
    console.log("Creating account with data:", newAccount);
  
    fetch('/api/insert-data-siswa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAccount),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response from server:", data);
        if (data.data) {
          alert('Siswa berhasil dibuat');
          setShowAllData([...showAllData, data.data]);
          setFilteredData([...showAllData, data.data]);
          setNewAccount({
            nisn: '',
            nis: '',
            nama: '',
            kelamin: '',
            tempat_lahir: '',
            tanggal_lahir: '',
            kelas: '',
          });
          setKelaminError('');
        } else {
          alert('Gagal membuat Siswa');
        }
      })
      .catch((err) => {
        alert('Terjadi kesalahan');
        console.log('Error creating account:', err);
      });
  };

  // Handle perubahan input untuk field form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  // Tampilkan modal detail siswa
  const handleShowDetail = (id) => {
    fetch(`/api/get-detail-siswa?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setDetail(data.data);
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

  // Handle penghapusan akun
  const handleDeleteAccount = async (id) => {
    event.preventDefault();

    const response = await fetch(`/api/delete-data-siswa`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      alert("Siswa berhasil dihapus");

      // Hapus akun yang dihapus dari state
      const updatedData = showAllData.filter((item) => item.id !== id);
      setShowAllData(updatedData);
      setFilteredData(updatedData);
    } else {
      alert("Gagal menghapus Siswa");
    }
  };

  return (
    <div className="bg-gray-100 flex">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar>Daftar Siswa</Navbar>

        <main className="flex flex-col flex-1">
          <div className="flex flex-col rounded p-5 gap-4">
            <div className="flex justify-between items-center">
              <div className="w-8/12 p-0 m-0">
                <SearchBar data={showAllData} onSearch={setFilteredData}>
                  Cari sesuai nama
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

            {filteredData.length === 0 && <p>Siswa tidak ada</p>}
            {filteredData.length > 0 && (
              <div className="w-full overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="w-1/12 py-2 px-4 border-b border-black">NIS</th>
                      <th className="w-5/12 py-2 px-4 border-b border-x border-black">Nama</th>
                      <th className="w-3/12 py-2 px-4 border-b border-x border-black">Kelamin</th>
                      <th className="w-3/12 py-2 px-4 border-b border-black text-center">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((data, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-black">{data.nis}</td>
                        <td className="py-2 px-4 border-x border-black">{data.nama}</td>
                        <td className="py-2 px-4 border-x border-black text-capitalize">{data.kelamin}</td>
                        <td className="py-2 px-4 border-black text-center flex items-center justify-center gap-2">
                          <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={() => handleShowDetail(data.id)}
                          >
                            <FiAlignJustify />
                          </button>
                          <button
                            className="bg-red-600 text-white p-2 rounded"
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

            {/* Modal Buat Akun Siswa Baru */}
            {showCreateTable && (
              <Modal show={showCreateTable} onHide={() => setShowCreateTable(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Buat Akun Siswa Baru</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <form className="flex flex-col gap-4" onSubmit={handleCreateAccount}>
                    <Form.Group>
                      <Form.Label>NISN</Form.Label>
                      <Form.Control
                        type="text"
                        name="nisn"
                        value={newAccount.nisn}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>NIS</Form.Label>
                      <Form.Control
                        type="text"
                        name="nis"
                        value={newAccount.nis}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Nama</Form.Label>
                      <Form.Control
                        type="text"
                        name="nama"
                        value={newAccount.nama}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="flex flex-col">
                            
                        <Form.Check
                              inline
                              label="Laki-Laki"
                              type="radio"
                              name="kelamin"
                              value="Laki-Laki"
                              checked={newAccount.kelamin === 'Laki-Laki'}
                              onChange={handleInputChange}
                              id="Laki-Laki"
                              required
                            />
            
                            <Form.Check
                              inline
                              label="Perempuan"
                              type="radio"
                              name="kelamin"
                              value="Perempuan"
                              checked={newAccount.kelamin === 'Perempuan'}
                              onChange={handleInputChange}
                              id="Perempuan"
                              required
                            />
      
                        </Form.Group>

                    <Form.Group>
                      <Form.Label>Tempat Lahir</Form.Label>
                      <Form.Control
                        type="text"
                        name="tempat_lahir"
                        value={newAccount.tempat_lahir}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Tanggal Lahir</Form.Label>
                      <Form.Control
                        type="date"
                        name="tanggal_lahir"
                        value={newAccount.tanggal_lahir}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Kelas</Form.Label>
                      <Form.Control
                        as="select"
                        name="kelas"
                        value={newAccount.kelas}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Pilih Kelas</option>
                        {kelasOptions.map((kelas) => (
                          <option key={kelas.id} value={kelas.id}>{kelas.kelas}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                      Buat Akun
                    </Button>
                  </form>
                </Modal.Body>
              </Modal>
            )}

            {/* Modal Detail Siswa */}
            {showDetail && (
              <Modal show={showDetail} onHide={() => setShowDetail(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Detail Siswa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {dataDetail ? (
                    <div className="flex flex-col gap-2">
                      <p>
                        <strong>NISN:</strong> {dataDetail.nisn}
                      </p>
                      <p>
                        <strong>NIS:</strong> {dataDetail.nis}
                      </p>
                      <p>
                        <strong>Nama:</strong> {dataDetail.nama}
                      </p>
                      <p>
                        <strong>Kelamin:</strong> {dataDetail.kelamin}
                      </p>
                      <p>
                        <strong>Tempat Tanggal Lahir:</strong> {dataDetail.tempat_lahir + " " + dataDetail.tanggal_lahir}
                      </p>
                      <p>
                        <strong>Kelas:</strong> {kelasMap[dataDetail.kelas] || "Tidak Diketahui"}
                      </p>
                    </div>
                  ) : (
                    <p>Data tidak ditemukan.</p>
                  )}
                </Modal.Body>
              </Modal>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DaftarSiswa;
