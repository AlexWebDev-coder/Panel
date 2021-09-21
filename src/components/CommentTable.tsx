/** @format */

import { FC, useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/system";

// hooks
import { useAppDispatch, useAppSelector } from "../hook/hooks";
// custom function title for table
import { titleTable } from "../Routing";
import { fetchComments } from "../redux/commentSlice/commentSlice";
import { ICommentState } from "../redux/commentSlice/types";
import { Link } from "@material-ui/core";

const CommentsTable: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { comments, error } = useAppSelector((state) => state.comment);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(8);

  const pageNumbers: number[] = [];

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = comments.slice(indexOfFirstPost, indexOfLastPost);

  const totalPosts = comments.length;

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {error ? (
        <h2 className="width-table">Error: {error}</h2>
      ) : (
        <Box className="width-table">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{titleTable("ID")}</TableCell>
                  <TableCell align="left">{titleTable("Post/id")}</TableCell>
                  <TableCell align="left">{titleTable("Name")}</TableCell>
                  <TableCell align="left">{titleTable("Email")}</TableCell>
                  <TableCell align="left">{titleTable("Body")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPosts.map(
                  (comm: ICommentState): JSX.Element => (
                    <TableRow key={comm.id}>
                      <TableCell component="th" scope="row">
                        {comm.id}
                      </TableCell>
                      <TableCell align="left">{comm.postId}</TableCell>
                      <TableCell align="left">{comm.name}</TableCell>
                      <TableCell align="left">{comm.email}</TableCell>
                      <TableCell align="left">{comm.body}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              mt: "10px",
            }}
          >
            {pageNumbers.map((num: number) => (
              <Button
                key={num}
                onClick={() => paginate(num)}
                variant="outlined"
                style={{ borderRadius: "60px" }}
              >
                {num}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};
export { CommentsTable };
