import { createContext, useState, useContext } from 'react';

// Membuat context baru
const DataContext = createContext();

// Membuat provider untuk membungkus aplikasi dan menyediakan state global
const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

// Membuat hook untuk menggunakan context
export const useData = () => useContext(DataContext);
