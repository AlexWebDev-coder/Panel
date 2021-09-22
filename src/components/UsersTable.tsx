/** @format */

import { FC, useState, useEffect, Fragment } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";

import { titleTable } from "../Routing";
import { useAppDispatch, useAppSelector } from "../hook/hooks";
import {
  deleteUsers,
  fetchUsers,
  fetchUsersDelete,
} from "../redux/usersSlice/userSlice";
import { IUsersState } from "../redux/usersSlice/types";

import { UsersItem } from "./ItemUsersTable";

const UsersTable: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { users, error, status } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const deleteUsersItem = (id: number) => dispatch(fetchUsersDelete(id));

  return (
    <>
      {error ? (
        <h2 className="width-table">Error: {error}</h2>
      ) : (
        <Box className="width-table">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">{titleTable("ID")}</TableCell>
                  <TableCell align="left">{titleTable("Name")}</TableCell>
                  <TableCell align="left">{titleTable("Email")}</TableCell>
                  <TableCell align="center">{titleTable("Action")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(
                  (user: IUsersState): JSX.Element => (
                    <UsersItem
                      key={user.id}
                      id={user.id}
                      name={user.name}
                      email={user.email}
                      username={user.username}
                      address={user.address}
                      deleteUsersItem={deleteUsersItem}
                    />
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export { UsersTable };
