import axios from 'axios';
import types from '../types.json';

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

    return {
        payload: response.data
    }
}