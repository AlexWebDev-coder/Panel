import { SlideProps } from "@material-ui/core/Slide";

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

export type TransitionProps = Omit<SlideProps, "direction">;
