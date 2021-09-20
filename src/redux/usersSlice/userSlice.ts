import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUsers } from './types';


export const fetchUsers = createAsyncThunk(
    "users/fetchUsers", async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users")
        if (!response.ok) {
            throw new Error("Something went wrong")
        }
        const data = await response.json()
        return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
        
    }
)

export const fetchUsersDelete = createAsyncThunk(
    "users/fetchUsersDelete", async (id: number, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Something went wrong")
            }
            dispatch(deleteUsers({ id }))
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState: IUsers = {
    users: [],
    status: null,
    error: null
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        deleteUsers: (state, action) => {
            state.users = state.users.filter(el => el.id !== action.payload.id)
        }
    },
    extraReducers: {
        [fetchUsers.pending as any]: (state) => {
            state.status = "loading";
            state.error = null
        },
        [fetchUsers.fulfilled as any]: (state, action) => {
            state.status = "resolved";
            state.users = action.payload
        },
        [fetchUsers.rejected as any]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload
        }
    }
})

export const { deleteUsers } = usersSlice.actions
export default usersSlice.reducer