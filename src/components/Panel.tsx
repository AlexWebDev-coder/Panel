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
import { useHistory } from "react-router";

const Panel: FC = () => {
  const history = useHistory();

  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            style={{ paddingLeft: "150px" }}
            variant="h6"
            noWrap
            component="div"
          >
            Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem>
              <Button onClick={() => history.push("/")}>Posts</Button>
            </ListItem>
            <ListItem>
              <Button onClick={() => history.push("/comments")}>
                Comments
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={() => history.push("/todos")}>Todos</Button>
            </ListItem>
            <ListItem>
              <Button onClick={() => history.push("/users")}>Users</Button>
            </ListItem>
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
