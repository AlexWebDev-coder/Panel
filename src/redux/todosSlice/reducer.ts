import { toggleChecked, fetchAddNewTodo, fetchAsyncDeleteTodo, fetchTodo } from "./todosSlice"


export const todoReducer = {
    fetchAddNewTodo,
    fetchAsyncDeleteTodo,
    fetchTodo,
    toggleChecked
}