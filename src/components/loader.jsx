<<<<<<< HEAD
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
=======
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
>>>>>>> 18a35c49671e9f55cee5f03baf79e4c2fe0f59fa
