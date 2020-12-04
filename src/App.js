import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import index from './pages/index';
import dashboard from './pages/dashboard';
import single from './pages/single';

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact component={index} />
        <Route path="/dashboard" exact component={dashboard} />
        <Route path="/dashboard/:id" exact component={single} />
      </BrowserRouter>
    </>
  );
}

export default App;
