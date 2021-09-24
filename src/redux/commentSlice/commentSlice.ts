import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComments, ICommentState, ILogInState } from './types';


export const fetchComments = createAsyncThunk(
    "comment/fetchComments", async (_, {rejectWithValue}) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=10")

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

export const fetchCommentsAdd = createAsyncThunk(
    "comment/fetchCommentsAdd", async ({postId,id,name,email,body}: ICommentState, { rejectWithValue, dispatch }) => {
        try {
            const newComments = {postId, id, name, email, body}
            const response = await fetch("https://jsonplaceholder.typicode.com/comments", {
                method: "POST",
                // headers: { "Content-type": "application/json" },
                // body: JSON.stringify(newComments),
            })
            if (!response.ok) {
                throw new Error("Can't add task. Server error");
            }
            dispatch(addComments(newComments))
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchCommentsEdit = createAsyncThunk(
    "comment/fetchCommentsEdit", async (data: ICommentState, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments`, {
                method: "POST",
            })

            if (!response.ok) {
                throw new Error("Can't add task. Server error");
              }

            dispatch(changeEvent(data))
            
        } catch (error) {
            return rejectWithValue("Something went wrong")
        }
    }
)

export const fetchCommentsDelete = createAsyncThunk(
    "comments/fetchCommentsDelete", async (id: number, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Can't delete comments. Server error")
            }
            dispatch(deleteComments({id}))

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


const initialState: IComments = {
    comments: [],
    logIn: {
        username: "",
        password: ""
    },
    status: null,
    error: null
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        addComments: (state, action: PayloadAction<ICommentState>) => {
            state.comments.push(action.payload)
        },
        changeEvent: (state, action) => {
            state.comments = state.comments.map((el) => el.id === action.payload.id ? action.payload : el)
        },
        deleteComments: (state, action) => {
            state.comments = state.comments.filter((el) => el.id !== action.payload.id)
        },
        logIn: (state, action: PayloadAction<ILogInState>) => {
            state.logIn = action.payload
        },
        logOut: (state, action: PayloadAction<ILogInState>) => {
            state.logIn = action.payload
        }
    },
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

export const { changeEvent, deleteComments, addComments, logIn, logOut } = commentSlice.actions
export default commentSlice.reducer
