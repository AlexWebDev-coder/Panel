import { englishReducer } from "../englishSlice/reducer";
import { userReducer } from "../usersSlice/reducer";
import { deletedUsersReducer } from "../deletedUserSlice/reducer";

export const allReducers = {
    ...englishReducer,
    ...userReducer,
    ...deletedUsersReducer
}