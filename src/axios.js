import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2/alpha/'
});

export default instance;