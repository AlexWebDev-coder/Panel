export interface ICommentState {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

export interface IComments {
    comments: ICommentState[]
    status: null | string,
    error: null | string
}