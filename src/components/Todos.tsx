/** @format */

import React, { FC, useEffect, useState } from "react";
import { addTodo, fetchTodo } from "../redux/todosSlice/todosSlice";
import { TodoItem } from "../components/TodoItem";
import { useAppDispatch, useAppSelector } from "../hook/hooks";
import { Container, Grid } from "@material-ui/core";
import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";

import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";

type TransitionProps = Omit<SlideProps, "direction">;
function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

const Todos: FC = () => {
  const dispatch = useAppDispatch();
  const { todo, error } = useAppSelector((state) => state.todo);
  const [title, setTitle] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const handleAdd =
    (Transition: React.ComponentType<TransitionProps>) => () => {
      if (title.trim().length) {
        dispatch(
          addTodo({
            id: Date.now(),
            title,
            completed: false,
          })
        );
        setTitle("");
      } else {
        setTransition(() => Transition);
        setOpen(true);
      }
    };

  useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  return (
    <Container>
      {error ? (
        <h2 className="width-table">Error: {error}</h2>
      ) : (
        <>
          <Box
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Add..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button onClick={handleAdd(TransitionLeft)}>Add New Todo</Button>
          </Box>

          <Grid container spacing={2}>
            {todo.map((todo, index) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                checked={todo.completed}
                index={index}
              />
            ))}
          </Grid>
        </>
      )}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        TransitionComponent={transition}
        message="The field cannot be empty"
        key={transition ? transition.name : ""}
      />
    </Container>
  );
};

export { Todos };
