import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/usersSlice";
import postsReducer from "../reducers/postsSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        posts: postsReducer
    }
})

export default store;