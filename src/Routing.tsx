/** @format */

import { FC } from "react";
import { Panel } from "./components/Panel";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Mui components
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
// Components
import { PostTable } from "./components/PostTable";
import { useAppSelector } from "./hook/hooks";

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 1,
    color: "#fff",
  },
}));

const Routing: FC = () => {
  const classes = useStyles();
  const { status } = useAppSelector((state) => state.post);
  return (
    <>
      {status === "loading" ? (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      <BrowserRouter>
        <Panel />
        <Switch>
          <Route exact path="/posts" component={PostTable} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export { Routing };
