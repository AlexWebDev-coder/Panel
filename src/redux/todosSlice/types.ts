
export interface ITodoState {
    userId: number
    id: number
    title: string
    completed: boolean
}

export interface ITodo {
    todo: ITodoState[]
    status: null | string
    error: null | string
}