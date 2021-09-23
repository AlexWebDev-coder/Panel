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
import { useAppDispatch, useAppSelector } from "../../hook/hooks";
// custom function title for table
import { titleTable } from "../../Routing";
import {
  fetchComments,
  fetchCommentsDelete,
} from "../../redux/commentSlice/commentSlice";
import { ICommentState } from "../../redux/commentSlice/types";
// components
import { CommentsEdit } from "./CommentsEdit";
import { CommentsAdd } from "./CommentsAdd";

const CommentsTable: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { comments, error } = useAppSelector((state) => state.comment);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(5);

  useEffect(() => {
    dispatch(fetchComments());
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
              <Box
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginBottom: "10px",
                }}
              >
                <CommentsAdd />
              </Box>
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
                      <TableCell align="center">{titleTable("Edit")}</TableCell>
                      <TableCell align="center">
                        {titleTable("Delete")}
                      </TableCell>
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
                          <TableCell align="center">
                            <CommentsEdit element={item} />
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Delete comments" arrow>
                              <IconButton
                                onClick={() =>
                                  dispatch(fetchCommentsDelete(item.id))
                                }
                              >
                                <DeleteForeverRoundedIcon color="warning" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Pagination Component */}
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
