import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Blog from './components/blog/Blog';
import ChooseCountry from './components/chooseCountry/chooseCountry';
import CountryFlag from './components/countryFlag/countryFlag';
function App() {
  return (
    <BrowserRouter>
          <Blog/>
          <ChooseCountry/>
          <div style = {{display: 'flex', flexWrap: 'wrap'}}>
            <CountryFlag/>
          </div>
    </BrowserRouter>
  );
}

export default App;
