/** @format */
import { FC } from "react";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import { ListItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useHistory } from "react-router";

const Panel: FC = (): JSX.Element => {
  const history = useHistory();

  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            component="div"
            className="title width-table"
          >
            Onboarding Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem>
              <Button onClick={() => history.push("/eng-table-form")}>
                ENG: Table Form
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={() => history.push("/users")}>
                NOR: Table Form
              </Button>
            </ListItem>
            <Divider />

            <ListItem>
              <Button onClick={() => history.push("/users")}>Users</Button>
            </ListItem>
            <ListItem>
              <Button onClick={() => history.push("/deletedUsers")}>
                Deleted users
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export { Panel };
