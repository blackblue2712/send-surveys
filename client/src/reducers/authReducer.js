import types from '../types.json';

let INIT_STATE = null;

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case types.FETCH_USER:
            return action.payload;
        case types.LOG_OUT:
            return null;
        default:
            return state;
    }
}