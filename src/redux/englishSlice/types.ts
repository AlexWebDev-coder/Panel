export interface IUsersState {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

export interface IUsers {
    englishUsers: IUsersState[]
    loading: boolean
    status: null | string,
    error: null | string
}

export type TPayload = {
    id: number
}

export type THeaders = {
    'Content-Type': string,
    Authorization: any
}

export interface IParams {
    limit: number;
    skip: number;
    field: string;
    orderBy: string;
}

