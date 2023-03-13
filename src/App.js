import './portfolio.css'

import Home from './pages/home';
import Portfolio from './pages/portfolio';

import FormDetails from './pages/form';
import './App.css';
import React from 'react';


import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Home /></>} />
        <Route path="/home" element={<><Home /></>} />
        <Route path="/formDetails" element={<><FormDetails /></>} />
        <Route path="/portfolio/:id" element={<><Portfolio /></>} />
      </Routes>
 </BrowserRouter>


  );

}

export default App;
