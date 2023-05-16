import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        post: {
            id: '',
            caption: '',
            likes: '',
            fileName: '',
        },
    },
    reducers: {
        setPost: (state, action) => {
            state.post = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload
        }
    },
});

export const { setPost, setPosts } = postsSlice.actions;
export default postsSlice.reducer;

export function fetchPosts(accessToken) {
    return async (dispatch) => {
        const response = await Axios.get(process.env.REACT_APP_SERVER + "/posts", {
            headers: {
                Authorization: accessToken
            }
        })
        dispatch(setPosts(response.data.posts))
        return response.data
    }
}

export function createPost(accessToken, data) {
    return async (dispatch) => {
        const response = await Axios.post(process.env.REACT_APP_SERVER + "/posts", data, {
            headers: {
                Authorization: accessToken
            }
        })
        dispatch(setPost(response.data.post))
        return response.data
    }
}

export function updatePost(accessToken, postId, data) {
    return async (dispatch) => {
        const response = await Axios.put(process.env.REACT_APP_SERVER + "/posts/" + postId, data, {
            headers: {
                Authorization: accessToken
            }
        })
        return response.data
    }
}

export function deletePost(accessToken, postId) {
    return async (dispatch) => {
        const response = await Axios.delete(process.env.REACT_APP_SERVER + "/posts/" + postId, {
            headers: {
                Authorization: accessToken
            }
        })
        return response.data
    }
}