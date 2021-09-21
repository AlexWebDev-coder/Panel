/** @format */

import { FC } from "react";
import { Panel } from "./components/Panel";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Mui components
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
// Components
import { PostTable } from "./components/PostTable";
import { useAppSelector } from "./hook/hooks";
import { CommentsTable } from "./components/CommentTable";
import { UsersTable } from "./components/UsersTable";
import { Todos } from "./components/Todos";

export const titleTable = (t: string) => (
  <Typography variant="h6">{t}</Typography>
);

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 1,
    color: "#fff",
  },
}));

const Routing: FC = () => {
  const classes = useStyles();
  const { post, comment, users, todo } = useAppSelector((state) => state);

  return (
    <>
      {(post.status || comment.status || users.status || todo.status) ===
      "loading" ? (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      <BrowserRouter>
        <Panel />

        <Switch>
          <Route exact path="/" component={PostTable} />
          <Route path="/comments" component={CommentsTable} />
          <Route path="/users" component={UsersTable} />
          <Route path="/todos" component={Todos} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export { Routing };
