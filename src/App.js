import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import index from './pages/index';
import strava from './pages/strava';

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact component={index} />
        <Route path="/strava" exact component={strava} />
        {/* <Route path="/:name" exact component={SinglePokemon} /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
