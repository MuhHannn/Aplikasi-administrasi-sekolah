import { destroyCookie, parseCookies, setCookie } from 'nookies';
import React, { useState } from 'react';

const Me = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    // Mendapatkan semua cookie
    const cookies = parseCookies();
    console.log({ cookies });

    // Menghancurkan cookie yang diinginkan
    destroyCookie(null, 'id', { path: '/' });
    destroyCookie(null, 'name', { path: '/' });

    // Mendapatkan cookie lagi setelah penghapusan untuk memeriksa
    const newCookies = parseCookies();
    console.log({ newCookies });

    // Membuat cookie baru
    setCookie(null, 'id', '12345', {
      maxAge: 30 * 24 * 60 * 60, // 30 hari
      path: '/',
    });
    setCookie(null, 'name', 'newUser', {
      maxAge: 30 * 24 * 60 * 60, // 30 hari
      path: '/',
    });

    // Mendapatkan cookie lagi setelah penyetelan untuk memeriksa
    const updatedCookies = parseCookies();
    console.log({ updatedCookies });
  };

  return <button onClick={handleClick}>Click Me!</button>;
};

export default Me;
