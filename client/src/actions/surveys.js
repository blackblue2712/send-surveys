import axios from 'axios';
import types from '../types.json';

export const sendSurvey = data => async dispatch => {
    const response = await axios.post("/services/surveys", data);
    console.log(response)

    return dispatch({
        type: types.SEND_SURVEYS,
        payload: response.data
    })
}