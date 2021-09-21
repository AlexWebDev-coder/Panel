import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ITodo } from './types';



export const fetchTodo = createAsyncThunk(
    "todo/fetchTodo", async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
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


const initialState: ITodo = {
    todo: [],
    status: null,
    error: null
}


const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todo.push(action.payload)
        },
        deleteTodo: (state, action) => {
            state.todo = state.todo.filter((el) => el.id !== action.payload.id)
        },
        toggleChecked: (state, action) => {
            const checked = state.todo.find(todo => todo.id !== action.payload.id)

            if (checked) {
                checked.completed = !checked.completed
            }
        }
    },
    extraReducers: {
        [fetchTodo.pending as any]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchTodo.fulfilled as any]: (state, action) => {
            state.status = 'resolved'
            state.todo = action.payload
        },
        [fetchTodo.rejected as any]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        }
    }
})

export const {addTodo, toggleChecked, deleteTodo } = todoSlice.actions
export default todoSlice.reducer