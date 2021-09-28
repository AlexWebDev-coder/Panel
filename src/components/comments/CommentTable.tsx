/** @format */

import { FC, useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/system/Box";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@mui/material/Tooltip";

// mui icons
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
// hooks
import { useAppSelector } from "../../hook/hooks";
// custom function title for table
import { titleTable } from "../../Routing";

import { ICommentState } from "../../redux/commentSlice/types";
// components
import { CommentsEdit } from "./CommentsEdit";
import { CommentsAdd } from "./CommentsAdd";

import { useAction } from "../../hook/hooks";

const CommentsTable: FC = (): JSX.Element => {
  const { comments, error, logIn } = useAppSelector((state) => state.comment);

  const { fetchCommentsDelete, fetchComments } = useAction();
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(5);

  useEffect(() => {
    fetchComments();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = comments.slice(indexOfFirstPost, indexOfLastPost);

  const totalPosts = comments.length;

  return (
    <>
      {error ? (
        <h2 className="width-table">Error: {error}</h2>
      ) : (
        <>
          {comments.length > 0 ? (
            <Box className="width-table">
              {logIn.username === "admin" && logIn.password === "123" ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginBottom: "10px",
                  }}
                >
                  <CommentsAdd />
                </Box>
              ) : null}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{titleTable("ID")}</TableCell>
                      <TableCell align="left">
                        {titleTable("Post/id")}
                      </TableCell>
                      <TableCell align="left">{titleTable("Name")}</TableCell>
                      <TableCell align="left">{titleTable("Email")}</TableCell>
                      <TableCell align="left">{titleTable("Body")}</TableCell>
                      {logIn.username === "admin" &&
                      logIn.password === "123" ? (
                        <>
                          <TableCell align="center">
                            {titleTable("Edit")}
                          </TableCell>
                          <TableCell align="center">
                            {titleTable("Delete")}
                          </TableCell>
                        </>
                      ) : null}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentPosts.map(
                      (item: ICommentState): JSX.Element => (
                        <TableRow key={item.id}>
                          <TableCell component="th" scope="row">
                            {item.id}
                          </TableCell>
                          <TableCell align="left">{item.postId}</TableCell>
                          <TableCell align="left">{item.name}</TableCell>
                          <TableCell align="left">{item.email}</TableCell>
                          <TableCell align="left">{item.body}</TableCell>
                          {logIn.username === "admin" &&
                          logIn.password === "123" ? (
                            <>
                              <TableCell align="center">
                                <CommentsEdit element={item} />
                              </TableCell>
                              <TableCell align="center">
                                <Tooltip title="Delete comments" arrow>
                                  <IconButton
                                    onClick={() => fetchCommentsDelete(item.id)}
                                  >
                                    <DeleteForeverRoundedIcon color="error" />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </>
                          ) : null}
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Pagination Place */}
              {totalPosts >= 6 ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    mt: "10px",
                  }}
                >
                  <Pagination
                    count={Math.ceil(totalPosts / postsPerPage)}
                    onChange={(event, val) => setCurrentPage(val)}
                  />
                </Box>
              ) : null}
            </Box>
          ) : (
            <Box style={{ paddingLeft: "20%" }}>
              <Typography variant="h3">No information in table</Typography>
            </Box>
          )}
        </>
      )}
    </>
  );
};
export { CommentsTable };
