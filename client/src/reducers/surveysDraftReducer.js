import types from '../types.json';

const INIT_STATE = [];

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case types.GET_DRAFT:
            return [...action.payload]
        case types.SAVE_SURVEY:
            return [action.payload.survey, ...state]
        case types.REMOVE_DRAFT:
            return state.filter(draft => draft._id !== action.payload);
        default:
            return state;
    }
};