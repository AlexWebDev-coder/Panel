
// Posts interface
export interface IPostsState {
    userId: number
    id: number
    title: string
    body: string
}
export interface IPosts {
    posts: IPostsState[]
    status: string | null
    error: string | null
}