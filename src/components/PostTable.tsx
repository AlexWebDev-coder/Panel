/** @format */

import { FC, useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
// hooks
import { useAppDispatch, useAppSelector } from "../hook/hooks";
// createAsyncThunk && reducer
import { fetchPosts, asyncDeletePosts } from "../redux/postSlice/postsSlice";
// types
import { TransitionProps, IPostsState } from "../redux/types";
// All title function
import { titleTable } from "../Routing";

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const PostTable: FC = () => {
  const dispatch = useAppDispatch();
  const { posts, error, status } = useAppSelector((state) => state.post);

  const [open, setOpen] = useState(false);

  const [transition, setTransition] = useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const deleteAsyncPost =
    (Transition: React.ComponentType<TransitionProps>, element: any) => () => {
      dispatch(asyncDeletePosts(element.id));
      setTransition(() => Transition);
      setOpen(true);
    };

  return (
    <>
      {error ? (
        <h2 className="width-table">Error: {error}</h2>
      ) : (
        <Box className="width-table">
          <TableContainer component={Paper}>
            <Table className="width-table" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>{titleTable("ID")}</TableCell>
                  <TableCell align="left">{titleTable("Title")}</TableCell>
                  <TableCell align="left">{titleTable("Body")}</TableCell>
                  <TableCell align="center">{titleTable("Action")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map(
                  (post: IPostsState): JSX.Element => (
                    <TableRow key={post.id}>
                      <TableCell>{<b>{post.id}</b>}</TableCell>
                      <TableCell align="left">{post.title}</TableCell>
                      <TableCell align="left">{post.body}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={deleteAsyncPost(TransitionRight, post)}
                        >
                          <DeleteOutlineRoundedIcon color="secondary" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Snackbar
        open={open}
        autoHideDuration={1300}
        onClose={() => setOpen(false)}
        TransitionComponent={transition}
        message="Delete Posts element"
        key={transition ? transition.name : ""}
      />
    </>
  );
};

export { PostTable };
