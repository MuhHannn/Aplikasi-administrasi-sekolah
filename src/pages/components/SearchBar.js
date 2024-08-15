// components/SearchBar.js

import { useState } from "react";

function SearchBar({ data, onSearch }) {
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
    <div className="flex mb-4">
      <input
        type="text"
        className="p-2 border rounded w-full"
        placeholder="Search by username"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar