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
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "../redux/postSlice/types";

import { titleTable } from "../Routing";
import { useAppDispatch, useAppSelector } from "../hook/hooks";
import { deleteUsers, fetchUsers } from "../redux/usersSlice/userSlice";
import { IUsersState, IUsersAddressState } from "../redux/usersSlice/types";
import { useDispatch } from "react-redux";

interface IRowProps {
  id: number;
  name: string;
  email: string;
  username: string;
  address: IUsersAddressState;
  deleteUser: (id: number) => { payload: typeof id };
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Row: FC<IRowProps> = ({
  address,
  email,
  id,
  name,
  username,
  deleteUser,
  open,
  setOpen,
}) => {
  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {id}
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="left">{email}</TableCell>
        <TableCell align="center">
          <IconButton onClick={() => deleteUser(id)}>
            <DeleteSweepOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>{titleTable("id")}</TableCell>
                    <TableCell>{titleTable("city & street")}</TableCell>
                    <TableCell>{titleTable("user name")}</TableCell>
                    <TableCell>{titleTable("customer")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">{id}</TableCell>
                    <TableCell align="left">
                      {`${address.city} - ${address.street}`}
                    </TableCell>
                    <TableCell align="left">{username}</TableCell>
                    <TableCell align="left">Total price ($)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const UsersTable: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const deleteUser = (id: number) => dispatch(deleteUsers(id));

  return (
    <>
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
                  <Row
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    username={user.username}
                    address={user.address}
                    deleteUser={deleteUser}
                    open={open}
                    setOpen={setOpen}
                  />
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export { UsersTable };
