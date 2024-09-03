import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/sidebar";

function DaftarPengajar() {
  const router = useRouter();
  const [showAllData, setShowAllData] = useState([]);
  const [dataDetail, setDetail] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [showCreateTable, setShowCreateTable] = useState(false);
  const [newAccount, setNewAccount] = useState({ kode: '', nama: '', kelamin: '', nomer_wa: '' });
  const [kelaminError, setKelaminError] = useState(''); // State for kelamin error message
  const { idDetail } = router.query;

  useEffect(() => {
    fetch(`/api/get-data-pengajar`)
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

    fetch(`/api/get-detail-pengajar?id=${idDetail}`)
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

    if (!newAccount.kelamin) {
      setKelaminError('Kelamin harap diisi');
      return;
    }

    fetch('/api/insert-data-pengajar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAccount),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          router.reload()
          alert('Akun berhasil dibuat');
          setShowAllData([...showAllData, data.data]);
          setFilteredData([...showAllData, data.data]);
          setNewAccount({ kode: '', nama: '', kelamin: '', nomer_wa: '' });
          setKelaminError(''); // Clear the error message
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
    fetch(`/api/get-detail-pengajar?id=${id}`)
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

  const handleDeleteAccount = async (id) => {
    const response = await fetch(`/api/delete-data-pengajar`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

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

  return (
    <div className="bg-gray-100 flex">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <div className="flex items-center bg-white text-xl font-semibold px-4 pt-4 pb-2 border-b border-black">
          <p className="p-0">Daftar Pengajar</p>
        </div>

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
              <p>Pengajar tidak ada</p>
            )}
            {filteredData.length > 0 && (
              <div className="w-full overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="w-1/12 py-2 px-4 border-b border-black">Kode</th>
                      <th className="w-5/12 py-2 px-4 border-b border-x border-black">Nama</th>
                      <th className="w-3/12 py-2 px-4 border-b border-x border-black">Kelamin</th>
                      <th className="w-3/12 py-2 px-4 border-b border-x border-black">Nomer Whatsapp</th>
                      <th className="w-3/12 py-2 px-4 border-b border-black text-center">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((data) => (
                      <tr key={data.id}>
                        <td className="py-2 px-4 border-black">{data.kode}</td>
                        <td className="py-2 px-4 border-x border-black">{data.nama}</td>
                        <td className="py-2 px-4 border-x border-black text-capitalize">{data.kelamin}</td>
                        <td className="py-2 px-4 border-x border-black text-capitalize">{data.nomer_wa}</td>
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

            {showCreateTable && (
              <Modal show={showCreateTable} onHide={() => setShowCreateTable(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Buat Pengajar</Modal.Title>
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
                      <label>Kelamin</label>
                      <div className="flex items-center gap-4">
                        <label>
                          <input
                            type="radio"
                            name="kelamin"
                            value="Laki-Laki"
                            checked={newAccount.kelamin === 'Laki-Laki'}
                            onChange={handleInputChange}
                          />
                          Laki-Laki
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="kelamin"
                            value="Perempuan"
                            checked={newAccount.kelamin === 'Perempuan'}
                            onChange={handleInputChange}
                          />
                          Perempuan
                        </label>
                      </div>
                      {kelaminError && <p className="text-red-500">{kelaminError}</p>}
                    </div>

                    <div className="mb-3">
                      <label>Nomer Whatsapp</label>
                      <input
                        type="text"
                        name="nomer_wa"
                        value={newAccount.nomer_wa}
                        onChange={handleInputChange}
                        className="border py-1 px-2 w-full rounded"
                      />
                    </div>
                    <Modal.Footer className="pb-0 px-0 pt-3 m-0">
                      <Button type="submit" variant="primary">
                          Simpan
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>

              </Modal>
            )}

            {showDetail && dataDetail && (
              <Modal show={showDetail} onHide={() => setShowDetail(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Detail Pengajar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p><strong>Kode:</strong> {dataDetail.kode}</p>
                  <p><strong>Nama:</strong> {dataDetail.nama}</p>
                  <p><strong>Kelamin:</strong> {dataDetail.kelamin}</p>
                  <p><strong>Nomer Whatsapp:</strong> {dataDetail.nomer_wa}</p>
                </Modal.Body>
              </Modal>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DaftarPengajar;
