import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ data, onSearch, searchByOptions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState(searchByOptions[0]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = data.filter(item =>
      item[searchBy].toLowerCase().includes(e.target.value.toLowerCase())
    );
    onSearch(filteredData);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <div className="search-bar flex items-center rounded border border-black">
      <select 
        value={searchBy} 
        onChange={handleSearchByChange} 
        className="border-l p-2 bg-white"
      >
        {searchByOptions.map((option, index) => (
          <option key={index} value={option}>
            {option.replace(/[_-]/g, ' ').charAt(0).toUpperCase() + option.replace(/[_-]/g, ' ').slice(1)}
          </option>
        ))}
      </select>

      <div className="relative w-full border-l-2 border-gray-200">
        <input 
          type="text"
          placeholder={`Search by ${searchBy.replace(/[_-]/g, ' ')}`}
          value={searchTerm}
          onChange={handleSearch}
          className="pr-10 p-2 outline-none w-full"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}

export default SearchBar;
