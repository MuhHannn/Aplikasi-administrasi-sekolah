import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Accordion, Offcanvas, Button } from 'react-bootstrap';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { IoMdMenu, IoMdSettings } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaHome, FaClock, FaPen, FaLongArrowAltRight } from 'react-icons/fa';

import CustomToggle from './CustomToggle';

import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({children}) => {
    const cookies = parseCookies();

    const router = useRouter();
    const currentPath = router.pathname;
    const isActive = (path) => currentPath === path;

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
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
        <div className="flex items-center bg-white text-xl font-semibold px-4 pt-4 pb-2 border-b border-black">
          <p className="p-0">{children}</p>
        </div>
    );
}

export default Navbar;
