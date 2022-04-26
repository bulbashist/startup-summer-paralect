import React from 'react';
import Header from './app/header/header';
import ProfileWidget from './app/profile/profile';

export const RESULTS_PER_PAGE = 4;

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <ProfileWidget></ProfileWidget>
    </React.Fragment>
  );
}

export default App;
