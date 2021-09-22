import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ITodo, ITodoState } from './types';

const initialState: ITodo = {
    todo: [],
    status: null,
    error: null
}

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

export const fetchAddNewTodo = createAsyncThunk(
    "todo/fetchAddNewTodo", async (title: string, { rejectWithValue, dispatch }) => {
        try {
            const todo = {
                id: Date.now(),
                title,
                userId: 1,
                completed: false,
            };
            const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(todo)
            })
            if (!response.ok) {
                throw new Error("Can't add task. Server error")
            }
            dispatch(addTodo(todo))
        } catch (error: any) {
            return rejectWithValue(error.message)
        }  
    }
)

export const fetchAsyncDeleteTodo = createAsyncThunk(
    "todo/fetchAsyncDeleteTodo", async (id: number, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                throw new Error("Can't delete task. Server error")
            }
            dispatch(deleteTodo({ id }))
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

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
        toggleChecked: (state, action: PayloadAction<number | any>) => {
            const checked = state.todo.find(todo => todo.id !== action.payload)

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