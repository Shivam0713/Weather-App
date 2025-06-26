import React, { useState } from 'react';
import search_icon from '../assets/search.png';

const SearchBar = ({ onSearch, history }) => {
  const [city, setCity] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setCity('');
      setShowHistory(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleHistoryClick = (city) => {
    setCity(city);
    onSearch(city);
    setShowHistory(false);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 200)}
        />
        <img src={search_icon} alt="Search" onClick={handleSearch} />
      </div>
      {showHistory && history.length > 0 && (
        <div className="history">
          <div className="history-list">
            {history.map((item, index) => (
              <button key={index} onClick={() => handleHistoryClick(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;