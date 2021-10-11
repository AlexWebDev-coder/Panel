import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDeleted, IDeletedUsersState, TPayload } from './types';


const initialState: IDeleted = {
    deletedUsers: []
}

const deletedUsersSlice = createSlice({
    name: "deletedUsersSlice",
    initialState,
    reducers: {
        addDeletedUsers: (state, action: PayloadAction<IDeletedUsersState>) => {
            state.deletedUsers.push(action.payload)
        },
        deleteUsers: (state, action: PayloadAction<TPayload>) => {
            state.deletedUsers = state.deletedUsers.filter((el) => el.id !== action.payload.id)
        }
    }
})

export const { addDeletedUsers, deleteUsers } = deletedUsersSlice.actions
export default deletedUsersSlice.reducer