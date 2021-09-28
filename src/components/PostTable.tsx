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
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// hooks
import { useAction, useAppSelector } from "../hook/hooks";
// types
import { TransitionProps, IPostsState } from "../redux/postSlice/types";
// All title function
import { titleTable } from "../Routing";

// Mui Alert
function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const PostTable: FC = (): JSX.Element => {
  const { posts, error } = useAppSelector((state) => state.post);
  const { username, password } = useAppSelector((state) => state.comment.logIn);

  const { fetchPosts, asyncDeletePosts } = useAction();

  const [open, setOpen] = useState(false);

  const [transition, setTransition] = useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  useEffect(() => {
    fetchPosts();
  }, []);

  const deleteAsyncPost =
    (
      Transition: React.ComponentType<TransitionProps>,
      element: { id: number }
    ) =>
    () => {
      setTransition(() => Transition);
      setOpen(true);
      asyncDeletePosts(element.id);
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
                  {username && password ? (
                    <TableCell align="center">{titleTable("Action")}</TableCell>
                  ) : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map(
                  (post: IPostsState): JSX.Element => (
                    <TableRow key={post.id}>
                      <TableCell>{<b>{post.id}</b>}</TableCell>
                      <TableCell align="left">{post.title}</TableCell>
                      <TableCell align="left">{post.body}</TableCell>
                      {username && password ? (
                        <TableCell align="center">
                          <Tooltip title="Delete" arrow>
                            <IconButton
                              onClick={deleteAsyncPost(TransitionRight, post)}
                            >
                              <DeleteOutlineRoundedIcon color="secondary" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      ) : null}
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
