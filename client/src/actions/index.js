import types from '../types.json';
import axios from 'axios';

export const fetchUser = () => async dispatch => {
    const response = await axios.get(`/auth/current-user`);

    dispatch({
        type: types.FETCH_USER,
        payload: response.data
    });
}

export const logout = () => async dispatch => {
    await axios.get("/auth/logout");

    dispatch({
        type: types.LOG_OUT
    });
}