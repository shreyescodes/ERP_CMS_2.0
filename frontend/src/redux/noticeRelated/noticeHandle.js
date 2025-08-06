import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './noticeSlice';

const URL = process.env.REACT_APP_BASE_URL;

export const getAllNotices = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${URL}/${address}List/${id}`);
        
        // Always dispatch success, even with empty array
        dispatch(getSuccess(result.data));
    } catch (error) {
        // Handle network or server errors
        const errorMessage = error.response?.data?.message || error.message || "Failed to fetch notices";
        dispatch(getError(errorMessage));
    }
};