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
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";

import Checkbox from "@mui/material/Checkbox";
// hooks
import { useAppDispatch, useAppSelector } from "../hook/hooks";
// custom function title for table
import { titleTable } from "../Routing";
import { fetchComments } from "../redux/commentSlice/commentSlice";

const CommentsTable: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  return (
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
            {comments.map(
              (comm): JSX.Element => (
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
    </Box>
  );
};
export { CommentsTable };
