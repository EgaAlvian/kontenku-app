import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        user: {
            id: null,
            username: '',
            email: '',
            fullName: '',
            biodata: '',
            profilePicture: '',
            verified: false
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;


export function registerUser(data) {
    return async (dispatch) => {
        const response = await Axios.post(process.env.REACT_APP_SERVER + "/users/register", data)
        return response.data
    }
}

export function loginUser(data) {
    return async (dispatch) => {
        const response = await Axios.post(process.env.REACT_APP_SERVER + "/users/login", data)
        dispatch(setUser(response.data.user))
        localStorage.setItem('access_token', response.data.token)
        return response.data
    }
}

export function requestVerifyEmail(accessToken) {
    return async (dispatch) => {
        const response = await Axios.get(process.env.REACT_APP_SERVER + "/users/verify-email", {
            headers: {
                Authorization: accessToken
            }
        })
        return response.data
    }
}

export function verifyEmail(token) {
    return async (dispatch) => {
        const response = await Axios.post(process.env.REACT_APP_SERVER + "/users/verify-email", { token })
        return response.data
    }
}

export function fetchCurrentUser(accessToken) {
    return async (dispatch) => {
        const response = await Axios.get(process.env.REACT_APP_SERVER + "/users/current", {
            headers: {
                Authorization: accessToken
            }
        })
        dispatch(setUser(response.data.user))
        return response.data
    }
}

export function updateUser(accessToken, data) {
    return async (dispatch) => {
        const response = await Axios.put(process.env.REACT_APP_SERVER + "/users", data, {
            headers: {
                Authorization: accessToken
            }
        })
        return response.data
    }
}
