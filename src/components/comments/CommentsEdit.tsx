/** @format */

import { FC, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import Tooltip from "@mui/material/Tooltip";

import { useAppDispatch } from "../../hook/hooks";
import { ICommentState } from "../../redux/commentSlice/types";
import { fetchCommentsEdit } from "../../redux/commentSlice/commentSlice";

interface ICommentsProps {
  element: ICommentState;
}

const CommentsEdit: FC<ICommentsProps> = (element) => {
  const { element: el } = element;
  const [open, setOpen] = useState<boolean>(false);

  const [value, setValue] = useState(el);

  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newName = e.target.name,
      newValue = e.target.value;
    setValue({
      ...value,
      [newName]: newValue,
    });
  };

  const handleSubmit = () => {
    dispatch(fetchCommentsEdit(value));
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <Tooltip title="Edit comments" arrow>
          <ModeEditRoundedIcon color="info" />
        </Tooltip>
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Change element</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="standard"
            margin="normal"
            value={value.name}
            name="name"
            onChange={(e) => handleChange(e)}
            fullWidth
          />
          <TextField
            label="Email"
            variant="standard"
            margin="normal"
            value={value.email}
            name="email"
            onChange={(e) => handleChange(e)}
            fullWidth
          />
          <TextField
            label="Body"
            variant="standard"
            margin="normal"
            value={value.body}
            name="body"
            onChange={(e) => handleChange(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { CommentsEdit };
