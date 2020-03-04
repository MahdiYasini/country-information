import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import countryReducer from './store/reducer/countrySetReducer';
import authenticateReducer from './store/reducer/authentication';

const rootReducer  = combineReducers ({
    country: countryReducer,
    auth: authenticateReducer
})

const store = createStore(rootReducer);

ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
