/** @format */

import { FC } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { Panel } from "../RoutingPanel";

import { titleTable } from "../../Routing";
import { useAction, useAppSelector } from "../../hook/hooks";

import {
  IDeletedUsersState,
  TPayload,
} from "../../redux/deletedUserSlice/types";

const DeletedUsers: FC = (): JSX.Element => {
  const { deletedUsers } = useAppSelector((state) => state.deleteUsers);
  const { deleteUsers, addUsers } = useAction();

  const handleSubmit = (item: IDeletedUsersState) => {
    deleteUsers(item);
    addUsers({
      id: item.id,
      postId: item.postId,
      name: item.name,
      email: item.email,
      body: item.body,
    });
  };

  return (
    <Box className="width-table">
      <Box className="table-margin">
        <Panel />
      </Box>
      {deletedUsers.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>{titleTable("ID")}</TableCell>
                <TableCell align="left">{titleTable("Post/ID")}</TableCell>
                <TableCell align="left">{titleTable("Name")}</TableCell>
                <TableCell align="left">{titleTable("Email")}</TableCell>
                <TableCell align="left">{titleTable("Body")}</TableCell>
                <TableCell align="center">{titleTable("Action")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deletedUsers.map(
                (el: IDeletedUsersState): JSX.Element => (
                  <TableRow key={el.id}>
                    <TableCell component="th" scope="row">
                      {el.id}
                    </TableCell>
                    <TableCell align="left">{el.postId}</TableCell>
                    <TableCell align="left">{el.name}</TableCell>
                    <TableCell align="left">{el.email}</TableCell>
                    <TableCell align="left"> {el.body}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Back to Onboarding" arrow>
                        <IconButton onClick={() => handleSubmit(el)}>
                          <AddCircleOutlineIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        titleTable("This table is not information")
      )}
    </Box>
  );
};

export { DeletedUsers };
