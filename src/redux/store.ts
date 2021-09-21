import { configureStore } from "@reduxjs/toolkit";
// Reducers
import postReducer from "./postSlice/postsSlice"
import commentReducer from "./commentSlice/commentSlice"
import usersReducer from "./usersSlice/userSlice"
import todoReducer from "./todosSlice/todosSlice"

export const store = configureStore({
    reducer: {
        post: postReducer,
        comment: commentReducer,
        users: usersReducer,
        todo: todoReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store