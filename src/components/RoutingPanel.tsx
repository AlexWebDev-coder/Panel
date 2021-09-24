/** @format */

import { FC } from "react";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { ListItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@mui/material/Divider";

import { Login } from "./login/Login";

import { useHistory } from "react-router";

import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";

const Panel: FC = (): JSX.Element => {
  const history = useHistory();

  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar style={{ display: "flex", justifyContent: "end" }}>
          <Login />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem>
              <Button onClick={() => history.push("/")}>
                <PostAddRoundedIcon /> &nbsp; Posts
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={() => history.push("/comments")}>
                <QuestionAnswerRoundedIcon />
                &nbsp; Comments
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={() => history.push("/todos")}>
                <FormatListNumberedRoundedIcon />
                &nbsp; Todos
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={() => history.push("/users")}>
                <GroupRoundedIcon />
                &nbsp; Users
              </Button>
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* Table */}
      </Box>
    </Box>
  );
};

export { Panel };
