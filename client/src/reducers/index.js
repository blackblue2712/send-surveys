import { combineReducers } from 'redux';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import surveysDraftReducer from './surveysDraftReducer';

export default combineReducers({
    auth: authReducer,
    surveys: surveysReducer,
    surveysDraft: surveysDraftReducer
})