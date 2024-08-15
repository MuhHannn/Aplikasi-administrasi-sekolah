import React from 'react';
import { Accordion, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { FaHome, FaClock, FaPen } from 'react-icons/fa'; // Import icons
import CustomToggle from './customToggle'; // Pastikan path yang benar

const Sidebar = () => {
  // const router = useRouter();
  // const currentPath = router.pathname;

  // const isActive = (path) => currentPath === path;
  // const defaultAccordionKey = ['/admin/daftar-admin', '/admin/daftar-pengajar', '/admin/daftar-siswa', '/admin/daftar-mapel'].some(path => isActive(path)) ? '0' : null;

  // return (
  //   <div className="bg-slate-800 w-2/12 flex flex-col py-5 px-3">
  //     <div className="text-white flex-grow">
  //       <p className='font-bold'>Menu</p>
  //       <hr />
  //       <div className='flex flex-col'>
  //         <div 
  //           className={`flex gap-2 items-center cursor-pointer py-2 border-b-2 transition-all duration-300 ${
  //             isActive('/admin/dashboard') ? 'border-white text-white' : 'border-transparent'
  //           } hover:text-white`}
  //           onClick={() => router.push('/admin/dashboard')}
  //         >
  //           <FaHome className='w-4 h-4' />
  //           Home    
  //         </div>
  //         <div className='cursor-pointer'>
  //           <Accordion defaultActiveKey={defaultAccordionKey}>
  //             <div className='flex flex-col'>
  //               <CustomToggle eventKey="0" isActive={defaultAccordionKey === '0'}>
  //                 Data Sekolah
  //               </CustomToggle>
  //               <Accordion.Collapse eventKey="0">
  //                 <div className='flex flex-col gap-3 ml-2'>
  //                   <div 
  //                     onClick={() => router.push('/admin/daftar-admin')} 
  //                     className={`flex gap-2 items-center mt-2 hover:pl-2 ${
  //                       isActive('/admin/daftar-admin') ? 'text-blue-500' : ''
  //                     } cursor-pointer hover:text-white`}
  //                   >
  //                     <span className={`w-2.5 h-2.5 rounded-full inline-block ${isActive('/admin/daftar-admin') ? 'bg-blue-500' : 'bg-white'}`}></span>
  //                     Daftar Admin
  //                   </div>
  //                   <div 
  //                     onClick={() => router.push('/admin/daftar-pengajar')} 
  //                     className={`flex gap-2 items-center hover:pl-2 ${
  //                       isActive('/admin/daftar-pengajar') ? 'text-blue-500' : ''
  //                     } cursor-pointer hover:text-white`}
  //                   >
  //                     <span className={`w-2.5 h-2.5 rounded-full inline-block ${isActive('/admin/daftar-pengajar') ? 'bg-blue-500' : 'bg-white'}`}></span>
  //                     Daftar Pengajar
  //                   </div>
  //                   <div 
  //                     onClick={() => router.push('/admin/daftar-siswa')} 
  //                     className={`flex gap-2 items-center hover:pl-2 ${
  //                       isActive('/admin/daftar-siswa') ? 'text-blue-500' : ''
  //                     } cursor-pointer hover:text-white`}
  //                   >
  //                     <span className={`w-2.5 h-2.5 rounded-full inline-block ${isActive('/admin/daftar-siswa') ? 'bg-blue-500' : 'bg-white'}`}></span>
  //                     Daftar Siswa
  //                   </div>
  //                   <div 
  //                     onClick={() => router.push('/admin/daftar-mapel')} 
  //                     className={`flex gap-2 items-center mb-2 hover:pl-2 ${
  //                       isActive('/admin/daftar-mapel') ? 'text-blue-500' : ''
  //                     } cursor-pointer hover:text-white`}
  //                   >
  //                     <span className={`w-2.5 h-2.5 rounded-full inline-block ${isActive('/admin/daftar-mapel') ? 'bg-blue-500' : 'bg-white'}`}></span>
  //                     Daftar Mapel
  //                   </div>
  //                 </div>
  //               </Accordion.Collapse>
  //             </div>
  //           </Accordion>
  //         </div>
  //         <div 
  //           className={`flex gap-2 items-center cursor-pointer py-2 border-b-2 transition-all duration-300 ${
  //             isActive('/admin/jadwal') ? 'border-white text-white' : 'border-transparent'
  //           } hover:text-white`}
  //           onClick={() => router.push('/admin/jadwal')}
  //         >
  //           <FaClock className='w-4 h-4' />
  //           Jadwal
  //         </div>
  //         <div 
  //           className={`flex gap-2 items-center cursor-pointer py-2 border-b-2 transition-all duration-300 ${
  //             isActive('/admin/penilaian') ? 'border-white text-white' : 'border-transparent'
  //           } hover:text-white`}
  //           onClick={() => router.push('/admin/penilaian')}
  //         >
  //           <FaPen className='w-4 h-4' />
  //           Penilaian
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Sidebar;
