import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="d-flex justify-center w100p">
      <RotatingLines
        strokeColor="#34aadc"
        strokeWidth="5"
        animationDuration="1"
        width="40"
        visible={true}
      />
    </div>
  );
};

export default Loader;
