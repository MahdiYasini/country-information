import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Blog from './components/blog/Blog';
import ChooseCountry from './components/chooseCountry/chooseCountry'
function App() {
  return (
    <BrowserRouter>
          <Blog/>
          <ChooseCountry/>
    </BrowserRouter>
  );
}

export default App;
