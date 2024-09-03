import { useRouter } from "next/router";
import { FaDatabase, FaLongArrowAltRight, FaRegCalendarTimes } from "react-icons/fa";
import { RiMarkPenFill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import Sidebar from "../components/sidebar";

function AdminPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 flex">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <div className="flex items-center bg-white text-xl font-semibold px-4 pt-4 pb-2 border-b border-black">
            <p className="p-0">Dashboard</p>
        </div>

        <main className="flex flex-1 p-[45px] gap-5">
          
          <div className="flex flex-col w-4/12 bg-white shadow-lg rounded px-5 py-3 text-9xl text-center justify-center items-center gap-3">
            
            <FaDatabase />
            <h2>Data Sekolah</h2>

            <div className="flex flex-col  w-10/12 gap-2 text-lg text-left">

              <div className="flex items-center cursor-pointer gap-2 hover:text-blue-500 hover:pl-2" onClick={() => {
                router.push('/admin/daftar-akun')
              }}>

                <FaLongArrowAltRight />
                Daftar Akun

              </div>

              <div className="flex items-center cursor-pointer gap-2 hover:text-blue-500 hover:pl-2" onClick={() => {
                router.push('/admin/daftar-pengajar')
              }}>
                
                <FaLongArrowAltRight />
                Daftar Pengajar
              
              </div>

              <div className="flex items-center cursor-pointer gap-2 hover:text-blue-500 hover:pl-2" onClick={() => {
                router.push('/admin/daftar-siswa')
              }}>
              
                <FaLongArrowAltRight />
                Daftar Siswa
              
              </div>
              
              <div className="flex items-center cursor-pointer gap-2 hover:text-blue-500 hover:pl-2" onClick={() => {
                router.push('/admin/daftar-mapel')
              }}>
              
                <FaLongArrowAltRight />
                Daftar Mapel
              
              </div>

            </div>
          
          </div>
          
          <div className="flex flex-col w-4/12 bg-white shadow-lg rounded px-5 py-3 text-9xl text-center justify-center items-center gap-3">
          
            <RiMarkPenFill />
            <h1>Penilaian</h1>
          
            <div className="flex flex-wrap justify-center items-center gap-y-3 text-lg text-left">
          
              <div className="flex items-center w-6/12 cursor-pointer gap-2 hover:text-blue-500 hover:pl-2" onClick={() => {
                router.push('/admin/daftar-akun')
              }}>
          
                <FaLongArrowAltRight />
                Kelas 1
          
              </div>
          
              <div className="flex items-center w-6/12 cursor-pointer gap-2 hover:text-blue-500 hover:pl-2" onClick={() => {
                router.push('/admin/daftar-akun')
              }}>
          
                <FaLongArrowAltRight />
                Kelas 2
          
              </div>
          
              <div className="flex items-center w-6/12 cursor-pointer gap-2 hover:text-blue-500 hover:pl-2" onClick={() => {
                router.push('/admin/daftar-akun')
              }}>
          
                <FaLongArrowAltRight />
                Kelas 3
          
              </div>
          
              <div className="flex items-center w-6/12 cursor-pointer gap-2 hover:text-blue-500 hover:pl-2" onClick={() => {
                router.push('/admin/daftar-akun')
              }}>
          
                <FaLongArrowAltRight />
                Kelas 4
          
              </div>
          
              <div className="flex items-center w-6/12 cursor-pointer gap-2 hover:text-blue-500 hover:pl-2" onClick={() => {
                router.push('/admin/daftar-akun')
              }}>
          
                <FaLongArrowAltRight />
                Kelas 5
          
              </div>
          
              <div className="flex items-center w-6/12 cursor-pointer gap-2 hover:text-blue-500 hover:pl-2" onClick={() => {
                router.push('/admin/daftar-akun')
              }}>
          
                <FaLongArrowAltRight />
                Kelas 6
          
              </div>
          
            </div>
         
          </div>
        
          <div className="flex flex-col w-4/12 items-center gap-3">
        
            <div className="flex flex-col w-full bg-white shadow-lg rounded px-5 py-[38px] text-center justify-center items-center">
        
                <div className="flex flex-col items-center justify-center gap-2">
                  <FaRegCalendarTimes className="text-7xl" />
                  <h2>Jadwal</h2>
                </div>

        
                <div className="flex w-full">

                  <div className="flex items-center w-6/12 cursor-pointer gap-2 hover:text-blue-500 hover:pl-2">
                    <FaLongArrowAltRight />
                    Ikhwan
                  </div>

                  <div className="flex items-center w-6/12 cursor-pointer gap-2 hover:text-blue-500 hover:pl-2">
                    <FaLongArrowAltRight />
                    Akhwat
                  </div> 
                </div>
            </div>
            <di className="flex flex-col w-full bg-white shadow-lg rounded px-5 py-3 text-9xl text-center justify-center items-center gap-1">
                <MdAccountCircle />
                <h1>Akun</h1>
            </di>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
