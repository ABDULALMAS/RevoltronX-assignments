import React from 'react';
import loading from '../../assets/loading.gif';

const Spinner: React.FC = () => {
  return (
    <div className="text-center">
      <img className="my-3" src={loading} alt="loading" />
    </div>
  );
};

export default Spinner;