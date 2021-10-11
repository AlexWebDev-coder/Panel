/** @format */

import { FC } from "react";
import { Panel } from "./components/RoutingPanel";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// Mui components
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
// Components
import { useAppSelector } from "./hook/hooks";
import { EngTableForm } from "./components/EnglishTable/EngTableForm";
import { UsersTable } from "./components/UsersTable";
import { SignIn } from "./components/signInForm/SignIn";
import { DeletedUsers } from "./components/deletedusersTable/DeletedUsers";

export const titleTable = (T: string) => (
  <Typography variant="h6">{T}</Typography>
);

export const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 1,
    color: "#fff",
  },
}));

const Routing: FC = () => {
  const classes = useStyles();
  const { englishForm, users } = useAppSelector((state) => state);
  const { loading } = useAppSelector((state) => state.englishForm);

  return (
    <>
      {(englishForm.status || users.status) === "loading" ? (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      {loading ? (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/panel" component={Panel} />
          <Route path="/eng-table-form" component={EngTableForm} />
          <Route path="/users" component={UsersTable} />
          <Route path="/deletedUsers" component={DeletedUsers} />
        </Switch>

        <Redirect push to="/" />
      </BrowserRouter>
    </>
  );
};

export { Routing };
