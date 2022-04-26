import React from 'react';
import glass from './assets/glass.svg';

function NotInteracted() {
  return (
    <div className="not-interacted">
      <img src={glass} alt="" />
      <h1 className="text">Start with searching a GitHub user</h1>
    </div>
  );
}

export default NotInteracted;
