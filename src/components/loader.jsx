import React from 'react';
import './loader.css';

const Loader = ({ backgroundImage }) => {
  return (
    <div className="loader-overlay" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})` }}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;