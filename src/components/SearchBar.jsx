import React, { useRef, useState } from 'react';
import search_icon from '../assets/search.png';

const SearchBar = ({ onSearch, history }) => {
  const inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          onKeyDown={(e) => e.key === "Enter" && onSearch(inputRef.current.value)}
        />
        <img
          src={search_icon}
          alt="Search"
          onClick={() => onSearch(inputRef.current.value)}
        />
      </div>
      {isFocused && history.length > 0 && (
        <div className="history">
          <div className="history-list">
            {history.map((city, idx) => (
              <button key={idx} onMouseDown={() => onSearch(city)}>
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;