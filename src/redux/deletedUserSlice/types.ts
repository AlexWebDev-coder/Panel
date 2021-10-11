export interface IDeletedUsersState {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

export interface IDeleted {
    deletedUsers: IDeletedUsersState[]
}

export type TPayload = {
    id: number
}