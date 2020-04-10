import types from '../types.json';

const INIT_STATE = [];

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case types.GET_SURVEYS:
            return action.payload;
        case types.SEND_SURVEYS:
            return [...state, action.payload.survey]
        default:
            return state;
    }
};