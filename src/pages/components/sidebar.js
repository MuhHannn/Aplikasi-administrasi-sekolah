import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { parseCookies } from 'nookies';
import { IoMdSettings } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaHome, FaClock, FaPen, FaLongArrowAltRight } from 'react-icons/fa';
import CustomToggle from './CustomToggle';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
    const cookies = parseCookies();
    const router = useRouter();
    const currentPath = router.pathname;
    const isActive = (path) => currentPath === path;

    const [name, setName] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    const defaultAccordionKey = ['/admin/daftar-akun', '/admin/daftar-pengajar', '/admin/daftar-siswa', '/admin/daftar-mapel'].some(path => isActive(path)) ? '0' : null;

    useEffect(() => {
        const cookies = parseCookies();
        setName(cookies.name || '');
        setIsMounted(true);
    }, []);

    const handleLogout = () => { 
        router.push('/login');
    };

    return (
        <sidebar className="w-2/12 min-h-screen flex flex-col bg-black text-white">
            <div className='border-b border-white pt-4 pb-3 mb-4'>
                <h1 className='px-4 text-xl'>Hanan</h1>
            </div>

            <div className='w-full px-0 flex flex-col flex-grow'>
                <div className="text-white p-0 flex-grow">
                    <div className='flex flex-col text-gray-400'>
                        {/* Menu items di atas */}
                        <div 
                            className={`flex gap-2 items-center cursor-pointer py-2 px-3 border-l-2 hover:text-white ${
                            isActive('/admin/dashboard') ? 'border-blue-500 text-white' : 'border-transparent'
                            }`}
                            onClick={() => router.push('/admin/dashboard')}
                        >
                            <FaHome className='w-4 h-4' />
                            Home
                        </div>

                        <div className='cursor-pointer'>
                            <Accordion defaultActiveKey={defaultAccordionKey}>
                                <div className='flex flex-col'>
                                    <CustomToggle eventKey="0" isActive={defaultAccordionKey === '0'}>
                                        Data Sekolah
                                    </CustomToggle>

                                    <Accordion.Collapse eventKey="0">
                                        <div className='flex flex-col gap-3 ml-2'>
                                            <div 
                                                onClick={() => router.push('/admin/daftar-akun')} 
                                                className={`flex gap-2 items-center mt-2 cursor-pointer hover:pl-2 hover:text-white ${
                                                    isActive('/admin/daftar-akun') ? 'text-blue-500' : ''
                                                } `}
                                            >
                                                <FaLongArrowAltRight />
                                                Daftar Akun
                                            </div>
                                            <div 
                                                onClick={() => router.push('/admin/daftar-pengajar')} 
                                                className={`flex gap-2 items-center cursor-pointer hover:pl-2 hover:text-white ${
                                                    isActive('/admin/daftar-pengajar') ? 'text-blue-500' : ''
                                                }`}
                                            >
                                                <FaLongArrowAltRight />
                                                Daftar Pengajar
                                            </div>
                                            <div 
                                                onClick={() => router.push('/admin/daftar-siswa')} 
                                                className={`flex gap-2 items-center cursor-pointer hover:pl-2 hover:text-white  ${
                                                    isActive('/admin/daftar-siswa') ? 'text-blue-500' : ''
                                                }  `}
                                            >
                                                <FaLongArrowAltRight />
                                                Daftar Siswa
                                            </div>
                                            <div 
                                                onClick={() => router.push('/admin/daftar-mapel')} 
                                                className={`flex gap-2 items-center mb-2 cursor-pointer hover:pl-2 hover:text-white ${
                                                    isActive('/admin/daftar-mapel') ? 'text-blue-500' : ''
                                                } `}
                                            >
                                                <FaLongArrowAltRight />
                                                Daftar Mapel
                                            </div>
                                        </div>
                                    </Accordion.Collapse>
                                </div>
                            </Accordion>
                        </div>

                        <div 
                            className={`flex gap-2 items-center cursor-pointer py-2 px-3 border-l-2 hover:text-white ${
                                isActive('/admin/jadwal') ? 'border-blue-500 text-white' : 'border-transparent'
                                }`}
                            onClick={() => router.push('/admin/jadwal')}
                        >
                            <FaClock className='w-4 h-4' />
                            Jadwal
                        </div>
            
                        <div 
                            className={`flex gap-2 items-center cursor-pointer py-2 px-3 border-l-2 hover:text-white ${
                                isActive('/admin/penilaian') ? 'border-blue-500 text-white' : 'border-transparent'
                            }`}
                            onClick={() => router.push('/admin/penilaian')}
                        >
                            <FaPen className='w-4 h-4' />
                            Penilaian
                        </div>
                    </div>
                </div>

                {/* Div ini sekarang berada di bawah */}
                <div className='flex flex-col text-gray-400 mt-auto pb-3 px-3'>
                    <div 
                        className={`flex gap-2 items-center cursor-pointer py-2 border-l-2 hover:text-white ${
                            isActive('/admin/akun') ? 'border-blue-500 text-white' : 'border-transparent'
                        }`}
                        onClick={() => router.push('/akun')}
                    >
                        <MdAccountCircle className='w-5 h-5' />
                        Saya
                    </div>
                    <div 
                        className={`flex gap-2 items-center cursor-pointer py-2 border-l-2 hover:text-white ${
                            isActive('/admin/pengaturan') ? 'border-blue-500 text-white' : 'border-transparent'
                            }`}
                        onClick={() => router.push('/admin/pengaturan')}
                    >
                        <IoMdSettings className='w-5 h-5' />
                        Pengaturan
                    </div>
                    <Button className='mt-2' onClick={handleLogout}>
                        Log out
                    </Button>
                </div>
            </div>
        </sidebar>
    );
}

export default Sidebar;
