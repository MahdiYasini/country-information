import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Box} from '@material-ui/core';
import Blog from './components/blog/Blog';
import ChooseCountry from './components/chooseCountry/chooseCountry';
import CountryFlag from './components/countryFlag/countryFlag';
import CountryInfo from './components/countryInfo/countryInfo';
import WeatherOfCapitalCity from './components/weatherOfCapitalCity/weatherOfCapitalCity'
import TelephoneCodeNumber from './components/telephoneCodeNumber/telephoneCodeNumber'
import CountryMap from './components/countryMap/countryMap';

function App() {
  return (
    <BrowserRouter>
          <Blog/>
          <ChooseCountry/>
          <Box display="flex" flexWrap="wrap">
            <CountryFlag />
            <CountryInfo/>
          </Box>
          <Box display="flex" flexWrap="wrap">
            <WeatherOfCapitalCity />
            <TelephoneCodeNumber />
            <CountryMap />
          </Box>
    </BrowserRouter>
  );
}

export default App;
