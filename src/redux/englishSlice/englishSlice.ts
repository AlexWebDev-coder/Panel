import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUsers, IUsersState, TPayload, THeaders, IParams } from './types';
import { Fetchs } from "../../helper"


export const fetchEnglishUsers = createAsyncThunk(
    "englishUsers/fetchEnglishUsers", async (
        // params: IParams,
      _,  { rejectWithValue }) => {

        let requestHeaders: THeaders = {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("token"),
        };       
        try {
            await Fetchs("admin/getallusers?limit=10&skip=0&field=email&orderBy=desc",
                {}, "GET", localStorage.getItem("token"),
                (response: any) => console.log("Response: ",response)
            )

            // const response =
            //     await fetch(`http://157.90.116.115:8081/api/admin/getallusers?limit=10&skip=0&field=email&orderBy=desc`, {
            //         headers: requestHeaders,
            //     })
            
            // console.log(response);
            

            // if (!response.ok) {
            //     throw new Error("Something went wrong")
            // }

            // const data = await response.json()
            // return data

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchEnglishAdd = createAsyncThunk(
    "englishUsers/fetchEnglishAdd", async ({postId,id,name,email,body}: IUsersState, { rejectWithValue, dispatch }) => {
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
            dispatch(addUsers(newComments))
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchEnglishEdit = createAsyncThunk(
    "englishUsers/fetchEnglishEdit", async (data: IUsersState, { rejectWithValue, dispatch }) => {
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

export const fetchEnglishDelete = createAsyncThunk(
    "englishUsers/fetchEnglishDelete", async (id: number, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Can't delete comments. Server error")
            }
            dispatch(deleteUsers({id}))

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


const initialState: IUsers = {
    englishUsers: [],
    loading: false,
    status: null,
    error: null
}

const englishSlice = createSlice({
    name: "englishSlice",
    initialState,
    reducers: {
        addUsers: (state, action: PayloadAction<IUsersState>) => {
            state.englishUsers.push(action.payload)
        },
        changeEvent: (state, action: PayloadAction<IUsersState>) => {
           state.englishUsers = state.englishUsers.map((el) => el.id === action.payload.id ? action.payload : el)
        },
        deleteUsers: (state, action: PayloadAction<TPayload>) => {
            state.englishUsers = state.englishUsers.filter((el) => el.id !== action.payload.id)
        },
        loading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    },
    extraReducers: {
        [fetchEnglishUsers.pending as any]: (state) => {
            state.status = "loading";
            state.error = null
        },
        [fetchEnglishUsers.fulfilled as any]: (state, action) => {
            state.status = "resolved";
            state.englishUsers = action.payload
        },
        [fetchEnglishUsers.rejected as any]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload
        }
    }
})

export const { changeEvent, deleteUsers, addUsers, loading } = englishSlice.actions
export default englishSlice.reducer
