import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone,
    getStudentAssignments
} from './studentSlice';

const REACT_APP_BASE_URL = "http://localhost:5000";

export const getAllStudents = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/Students/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const updateStudentFields = (id, fields, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(stuffDone());
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const removeStuff = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(stuffDone());
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getStudentAssignmentsCount = (studentId) => async (dispatch) => {
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}/StudentAssignments/${studentId}`);
        if (response.data.message) {
            dispatch({
                type: "STUDENT_ERROR",
                payload: response.data.message,
            });
        } else {
            dispatch(getStudentAssignments(response.data.assignmentsCount));
        }
    } catch (error) {
        dispatch({
            type: "STUDENT_ERROR",
            payload: error.response.data.message,
        });
    }
};