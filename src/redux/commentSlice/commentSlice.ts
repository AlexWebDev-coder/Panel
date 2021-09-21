import { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IComments, ICommentState } from './types';


export const fetchComments = createAsyncThunk(
    "comment/fetchComments", async (_, {rejectWithValue}) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/comments")

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


const initialState: IComments = {
    comments: [],
    status: null,
    error: null
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchComments.pending as any]: (state) => {
            state.status = "loading";
            state.error = null
        },
        [fetchComments.fulfilled as any]: (state, action) => {
            state.status = "resolved";
            state.comments = action.payload
        },
        [fetchComments.rejected as any]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload
        }
    }
})

export const {  } = commentSlice.actions
export default commentSlice.reducer
