// pages/index.js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import SearchBar from "../components/searchBar";

function Home() {
  const router = useRouter();
  const [dataDetail, setDetail] = useState(null);
  const [showAllData, setShowAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
          router.push(`/`);
        } else {
          setDetail(data.data);
        }
      });
  }, [idDetail]);

  const handleShowDetail = (id) => {
    fetch(`/api/get-detail-pengajar?id=${id}`)
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

      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 p-5 overflow-y-auto">
          <div className="flex flex-col flex-1 bg-white shadow-lg rounded max-h-full p-5">
            <div className="flex justify-between p-0 m-0">
              Daftar Pengajar
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
                onClick={() => {
                  router.push("/");
                }}
              >
                Buat Antrian
              </button>
            </div>

            {/* Use the SearchBar component */}
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
                      {/* <th className="py-2 px-4 border border-slate-600">Status</th> */}
                      <th className="py-2 px-4 border border-slate-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((data, index) => (
                      <tr key={index} className="border border-slate-600">
                        <td className="py-2 px-4 border border-slate-600">{data.id}</td>
                        <td className="py-2 px-4 border border-slate-600">{data.nama}</td>
                        {/* <td className="py-2 px-4 text-center border border-slate-600">{data.status}</td> */}
                        <td className="py-2 px-4 text-center border border-slate-600">
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={() => handleShowDetail(data.id)}
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {showModal && dataDetail && (
              <div
                id="myModal"
                className="fixed z-10 py-28 px-72 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-40"
              >
                <div className="bg-white m-auto py-5 px-14 border border-gray-400 w-4/5">
                  <h1 className="text-center font-bold text-2xl mb-5">
                    Detail Antrian
                  </h1>
                  <div className="flex justify-between items-center gap-3 my-2">
                    <p className="w-full">ID Tamu</p>
                    <p className="text-center">:</p>
                    <p className="w-full">{dataDetail.id}</p>
                  </div>
                  <div className="flex justify-between items-center gap-3 my-2">
                    <p className="w-full">Nama</p>
                    <p className="text-center">:</p>
                    <p className="w-full">{dataDetail.username}</p>
                  </div>
                  {/* <div className="flex justify-between items-center gap-3 my-2">
                    <p className="w-full">status</p>
                    <p className="text-center">:</p>
                    <p className="w-full">{dataDetail.status}</p>
                  </div> */}
                  <div className="flex justify-center items-center gap-3 mt-5">
                    <button
                      className="bg-slate-200 px-3 py-1 rounded"
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home
