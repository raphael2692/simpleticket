import React from 'react';

import { Navbar} from './app/components/Navbar';

// import './App.css';
import { Home } from './app/components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './app/components/Login';

function App() {
  return (

    <div className='App'>
      <Navbar></Navbar>

      <BrowserRouter>
        <Routes>
            <Route path='/home' element={
                <Home />
            }>
            </Route>
            <Route path='/login' element={
                <Login />
            }>
            </Route>
        </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
