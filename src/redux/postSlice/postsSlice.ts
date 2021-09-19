import { IPosts, IPostsState } from './../types';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"


export const fetchPosts = createAsyncThunk(
    "fetchPosts", async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
        
            if (!response.ok) {      
              return new Error("Something went wrong")
            }
            const data = await response.json()
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
        
    }
)

const initialState: IPosts = {
    posts: [],
    status: null,
    error: null
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        deletePost: (state, action: PayloadAction<number>) => {
          state.posts = state.posts.filter(el => el.id !== action.payload)
        }
    },
    extraReducers: {
        [fetchPosts.pending as any]: (state) => {
            state.status = "loading";
            state.error = null
        },
        [fetchPosts.fulfilled as any]: (state, action) => {
            state.status = "resolved";
            state.posts = action.payload
        },
        [fetchPosts.rejected as any]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload
        }
    }
})

export const { deletePost } = postsSlice.actions
export default postsSlice.reducer