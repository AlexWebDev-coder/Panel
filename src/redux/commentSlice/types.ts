export interface ICommentState {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

export interface ILogInState {
    username: string
    password: string
}

export interface IComments {
    comments: ICommentState[]
    logIn: ILogInState
    status: null | string,
    error: null | string
}

