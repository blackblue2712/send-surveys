import axios from 'axios';
import types from '../types.json';

export const getSurveys = () => async dispatch => {
    const response = await axios.get("/services/surveys");
    console.log(response);

    return dispatch({
        type: types.GET_SURVEYS,
        payload: response.data
    });
}

export const sendSurvey = data => async dispatch => {
    const response = await axios.post("/services/surveys", data);
    console.log(response)

    if(!response.data.survey) {
        return {
            payload: response.data
        }
    }

    return dispatch({
        type: types.SEND_SURVEYS,
        payload: response.data
    })
}

export const saveSurvey = data => async dispatch => {
    const response = await axios.post("/services/surveys/save", data);
    console.log(response)

    return dispatch({
        type: types.SAVE_SURVEY,
        payload: response.data
    })
}

export const getSurveysDraft = () => async dispatch => {
    const response = await axios.get("/services/surveys/draft");
    console.log(response)

    return dispatch({
        type: types.GET_DRAFT,
        payload: response.data
    })
}

export const removeDraft = sid => async dispatch => {
    await axios.delete("/services/surveys/draft/" + sid);

    return dispatch({
        type: types.REMOVE_DRAFT,
        payload: sid
    });
}