import types from '../types.json';

const INIT_STATE = [];

export default (state = INIT_STATE, action) => {
    console.log(state)
    switch(action.type) {
        case types.SEND_SURVEYS:
            return [...state, action.payload.survey]
        case types.FETCH_SURVEYS:
            return action.payload;

        default:
            return state;
    }
};