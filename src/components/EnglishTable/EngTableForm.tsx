/** @format */

import { FC, useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@mui/system/Box";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";
// mui icons
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
// hooks
import { useAppSelector } from "../../hook/hooks";
// custom function title for table
import { titleTable } from "../../Routing";
import { IUsersState } from "../../redux/englishSlice/types";
// components
import { EngTableEdit } from "./EngTableEdit";
import { EngTableAdd } from "./EngTableAdd";
import { useAction } from "../../hook/hooks";

import { Panel } from "../RoutingPanel";

const EngTableForm: FC = (): JSX.Element => {
  const { englishUsers, error } = useAppSelector((state) => state.englishForm);

  const { fetchEnglishDelete, fetchEnglishUsers, addDeletedUsers } =
    useAction();

  // const params = { limit: 10, skip: 0, field: "email", orderBy: "desc" };

  useEffect(() => {
    fetchEnglishUsers();
  }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(4);

  const usersDelete = (el: IUsersState) => {
    fetchEnglishDelete(el.id);
    addDeletedUsers({
      id: el.id,
      postId: el.postId,
      name: el.name,
      email: el.email,
      body: el.body,
    });
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = englishUsers.slice(indexOfFirstPost, indexOfLastPost);

  // const totalPosts = englishUsers.length;

  return (
    <>
      <Box className="table-margin">
        <Panel />
      </Box>
      {error ? (
        <h2 className="width-table">Error: {error}</h2>
      ) : (
        <>
          <Box className="width-table">
            <Box className="add-btn">
              <EngTableAdd />
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{titleTable("ID")}</TableCell>
                    <TableCell align="left">{titleTable("Post/id")}</TableCell>
                    <TableCell align="left">{titleTable("Name")}</TableCell>
                    <TableCell align="left">{titleTable("Email")}</TableCell>
                    <TableCell align="left">{titleTable("Body")}</TableCell>
                    <TableCell align="center">{titleTable("Edit")}</TableCell>
                    <TableCell align="center">{titleTable("Delete")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {currentPosts.map(
                    (item: IUsersState): JSX.Element => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                          {item.id}
                        </TableCell>
                        <TableCell align="left">{item.postId}</TableCell>
                        <TableCell align="left">{item.name}</TableCell>
                        <TableCell align="left">{item.email}</TableCell>
                        <TableCell align="left">{item.body}</TableCell>
                        <TableCell align="center">
                          <EngTableEdit element={item} />
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Delete users" arrow>
                            <IconButton onClick={() => usersDelete(item)}>
                              <DeleteForeverRoundedIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )
                  )} */}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Pagination Place */}
          {/* {totalPosts >= 6 ? (
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
          ) : null} */}
        </>
      )}
    </>
  );
};
export { EngTableForm };
