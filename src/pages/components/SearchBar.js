import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ children, data, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      onSearch(data);
    } else {
      const filtered = data.filter((item) =>
        item.username.toLowerCase().includes(e.target.value.toLowerCase())
      );
      onSearch(filtered);
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        className="py-2 px-3 border rounded-full w-full"
        placeholder={children}
        value={searchQuery}
        onChange={handleSearch}
      />
      <FaSearch className="absolute right-[415px] top-[138px] text-gray-400 text-lg" />
    </div>
  );
}

export default SearchBar;