import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import countryReducer from './store/reducer/countrySetReducer';
import authenticateReducer from './store/reducer/authentication';

import axios from 'axios';
axios.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

const rootReducer  = combineReducers ({
    country: countryReducer,
    auth: authenticateReducer
})

const store = createStore(rootReducer);

ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
