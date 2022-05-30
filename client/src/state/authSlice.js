import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, { payload: { user, token}}) => {
            state.user = user;
            state.token = token;
            console.log("AuthSlice token: ", state.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

// reduce
export const authReducer = authSlice.reducer;
// action creators
export const {login, logout} = authSlice.actions;
// selectors
export const selectLoggedInUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;