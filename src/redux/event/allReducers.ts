import { commentReducer } from "../commentSlice/reducer";
import { postReducer } from "../postSlice/reducer";
import { todoReducer } from "../todosSlice/reducer";
import { userReducer } from "../usersSlice/reducer";


export const allReducers = {
    ...commentReducer,
    ...postReducer,
    ...todoReducer,
    ...userReducer
}