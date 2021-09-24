/** @format */

import { FC, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { titleTable } from "../Routing";
import { useAppSelector, useAction } from "../hook/hooks";

import { IUsersState } from "../redux/usersSlice/types";

import { UsersItem } from "./ItemUsersTable";

const UsersTable: FC = (): JSX.Element => {
  const { users, error } = useAppSelector((state) => state.users);
  const { username, password } = useAppSelector((state) => state.comment.logIn);

  const { fetchUsers, fetchUsersDelete } = useAction();

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUsersItem = (id: number) => fetchUsersDelete(id);

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
                  {username && password ? (
                    <TableCell align="center">{titleTable("Action")}</TableCell>
                  ) : null}
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
                      userName={user.username}
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
