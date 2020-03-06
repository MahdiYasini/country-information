import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Box} from '@material-ui/core';
import Blog from './components/blog/Blog';
import ChooseCountry from './components/chooseCountry/chooseCountry';
import CountryFlag from './components/countryFlag/countryFlag';
import CountryInfo from './components/countryInfo/countryInfo';
function App() {
  return (
    <BrowserRouter>
          <Blog/>
          <ChooseCountry/>
          <Box display="flex" flexDirection="row" flexWrap="wrap">
            <CountryFlag />
            <CountryInfo/>
          </Box>
    </BrowserRouter>
  );
}

export default App;
