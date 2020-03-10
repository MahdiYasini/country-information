import * as actionTypes from '../actions';

const initialState = {
    authenticated: false,
    username: 'Guest'
}

const authenticateReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATION:
            return {
                ...state,
                username: action.username,
                authenticated: true
            }
        default:
            return state;
    }
}

export default authenticateReducer;