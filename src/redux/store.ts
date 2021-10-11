import { configureStore } from "@reduxjs/toolkit";
// Reducers
import englishReducer from "./englishSlice/englishSlice"
import usersReducer from "./usersSlice/userSlice"
import deleteUserReducer from "./deletedUserSlice/deletedUsersSlice"

export const store = configureStore({
    reducer: {
        englishForm: englishReducer,
        users: usersReducer,
        deleteUsers: deleteUserReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch