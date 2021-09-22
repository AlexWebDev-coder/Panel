/** @format */

import { FC } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@material-ui/core";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import RestoreFromTrashRoundedIcon from "@mui/icons-material/RestoreFromTrashRounded";
import { useAppDispatch, useAppSelector } from "../hook/hooks";

import {
  fetchAsyncDeleteTodo,
  toggleChecked,
} from "../redux/todosSlice/todosSlice";

interface IProps {
  id: number;
  title: string;
  checked: boolean;
  index: number;
}

const TodoItem: FC<IProps> = (props) => {
  const dispatch = useAppDispatch();
  const { id, title, checked, index } = props;

  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ maxWidth: 345, mt: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Todo: # {id}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {title}
          </Typography>
        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Checkbox
            value={checked}
            onChange={() => dispatch(toggleChecked(id))}
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />

          <Button onClick={() => dispatch(fetchAsyncDeleteTodo(id))}>
            <RestoreFromTrashRoundedIcon />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export { TodoItem };
