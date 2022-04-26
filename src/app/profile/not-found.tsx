import React from 'react';
import man from './assets/man.svg';

function NotFound() {
  return (
    <div className="not-found">
      <img src={man} alt="" />
      <h1 className="text">User not found</h1>
    </div>
  );
}

export default NotFound;
