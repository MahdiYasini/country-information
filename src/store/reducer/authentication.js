import * as actionTypes from '../actions';

const initialState = {
    authenticated: false,
    username: 'Guest'
}

const authenticateReducer = (state = initialState, action) => {
    return state;
}

export default authenticateReducer;