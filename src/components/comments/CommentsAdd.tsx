/** @format */

import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import Tooltip from "@mui/material/Tooltip";

import { useAction } from "../../hook/hooks";

const CommentsAdd: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { fetchCommentsAdd } = useAction();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const addNewComments = () => {
    if (name && email && body) {
      fetchCommentsAdd({ postId: 1, id: Date.now(), name, email, body });
      setOpen(false);
      clearInput();
    } else alert("Syntax error");
  };

  const clearInput = () => {
    setName("");
    setEmail("");
    setBody("");
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Tooltip title="Add new comments" arrow>
          <AddTaskRoundedIcon color="success" />
        </Tooltip>
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add new comments</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Body"
            fullWidth
            variant="standard"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={addNewComments}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { CommentsAdd };
