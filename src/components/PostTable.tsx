/** @format */

import { FC, useEffect } from "react";
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
// hooks
import { useAppDispatch, useAppSelector } from "../hook/hooks";
// createAsyncThunk && reducer
import { fetchPosts, deletePost } from "../redux/postSlice/postsSlice";

const PostTable: FC = () => {
  const dispatch = useAppDispatch();
  const { posts, error } = useAppSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      {error ? (
        <h2 className="width-table">Error: {error}</h2>
      ) : (
        <Box className="width-table">
          <a
            href="https://jsonplaceholder.typicode.com/posts"
            target="_blank"
            lang="en"
          >
            <span> https://jsonplaceholder.typicode.com/posts</span>
          </a>
          <TableContainer component={Paper}>
            <Table className="width-table" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Body</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.id}</TableCell>
                    <TableCell align="left">{post.title}</TableCell>
                    <TableCell align="left">{post.body}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => dispatch(deletePost(post.id))}>
                        <DeleteOutlineRoundedIcon color="secondary" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export { PostTable };
