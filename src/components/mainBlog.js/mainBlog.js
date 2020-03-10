import React from 'react';
import {Box} from '@material-ui/core';
import ChooseCountry from '../chooseCountry/chooseCountry';
import CountryFlag from '../countryFlag/countryFlag';
import CountryInfo from '../countryInfo/countryInfo';
import WeatherOfCapitalCity from '../weatherOfCapitalCity/weatherOfCapitalCity'
import TelephoneCodeNumber from '../telephoneCodeNumber/telephoneCodeNumber'
import CountryMap from '../countryMap/countryMap';

const MainBlog = () => (    
<>
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
</>
)

export default MainBlog;

