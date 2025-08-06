import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teachersList: [],
    loading: false,
    error: null,
    response: null,
    testsCount: 0,
    totalHours: 0,
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.teachersList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getTeacherStats: (state, action) => {
            state.testsCount = action.payload.testsCount;
            state.totalHours = action.payload.totalHours;
            state.loading = false;
            state.error = null;
            state.response = null;
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getTeacherStats,
} = teacherSlice.actions;

export const teacherReducer = teacherSlice.reducer;