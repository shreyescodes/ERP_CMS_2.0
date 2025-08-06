import axios from 'axios';
import { getRequest, getSuccess, getFailed, getError, getTeacherStats } from './teacherSlice';

const URL = process.env.REACT_APP_BASE_URL

export const getAllTeachers = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${URL}/Teachers/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const getTeacherDetails = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${URL}/Teacher/${id}`);
        if (result.data) {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const updateTeacherSubject = (teacherId, teachSubject) => async (dispatch) => {
    dispatch(getRequest());
    try {
        await axios.put(`${URL}/TeacherSubject`, { teacherId, teachSubject }, {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch(getSuccess("Subject Updated Successfully"));
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const fetchTeacherStats = (teacherId) => async (dispatch) => {
    try {
        const response = await axios.get(`${URL}/TeacherStats/${teacherId}`);
        if (response.data.message) {
            dispatch({
                type: "TEACHER_ERROR",
                payload: response.data.message,
            });
        } else {
            dispatch(getTeacherStats(response.data));
        }
    } catch (error) {
        dispatch({
            type: "TEACHER_ERROR",
            payload: error.response.data.message,
        });
    }
};