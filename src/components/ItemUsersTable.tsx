/** @format */

import { FC, useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";

import { titleTable } from "../Routing";

import { IUsersAddressState } from "../redux/usersSlice/types";

interface IRowProps {
  id: number;
  name: string;
  email: string;
  username: string;
  address: IUsersAddressState;
  deleteUsersItem: (id: number) => void;
}

const UsersItem: FC<IRowProps> = (props) => {
  const [open, setOpen] = useState(false);
  const { id, name, username, email, address, deleteUsersItem } = props;

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
          <Button onClick={() => deleteUsersItem(id)}>
            <DeleteSweepOutlinedIcon color="warning" />
          </Button>
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

export { UsersItem };
