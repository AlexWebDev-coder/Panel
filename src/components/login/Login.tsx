/** @format */

import { FC, useState, forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import Tooltip from "@mui/material/Tooltip";

import { TransitionProps } from "@mui/material/transitions";
import { useAction, useAppSelector } from "../../hook/hooks";

import { Logout } from "./Logout";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IDataState {
  username: string;
  password: string;
}

const Login: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { logIn } = useAction();
  const [data, setData] = useState<IDataState>({
    username: "",
    password: "",
  });
  const { username, password } = useAppSelector((state) => state.comment.logIn);

  const handleSubmit = () => {
    if (data.username === "admin" && data.password === "123") {
      logIn(data);
      setData({ username: "", password: "" });
      setOpen(false);
    } else {
      alert("This user does not exist");
      setData({ username: "", password: "" });
    }
  };

  const handleClose = () => {
    setData({ username: "", password: "" });
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newName = e.target.name;
    let newValue = e.target.value;
    setData({
      ...data,
      [newName]: newValue,
    });
  };

  return (
    <>
      <IconButton size="large" color="inherit" onClick={() => setOpen(true)}>
        {username && password ? null : (
          <Tooltip title="Sign In" arrow>
            <AccountCircle
              color={!username && !password ? "inherit" : "disabled"}
            />
          </Tooltip>
        )}
      </IconButton>
      <Logout />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Sign In"}</DialogTitle>
        <DialogContent>
          <TextField
            label="User name"
            variant="standard"
            margin="normal"
            name="username"
            fullWidth
            placeholder="Example: admin"
            value={data.username}
            onChange={(e) => handleChange(e)}
            error={data.username.length === 0 ? true : false}
          />
          <TextField
            label="Password"
            variant="standard"
            margin="normal"
            name="password"
            fullWidth
            placeholder="Example: 123"
            value={data.password}
            onChange={(e) => handleChange(e)}
            error={data.password.length === 0 ? true : false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Sign</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { Login };
