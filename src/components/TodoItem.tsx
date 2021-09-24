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
import { useAction, useAppSelector } from "../hook/hooks";

interface IProps {
  id: number;
  title: string;
  checked: boolean;
}

const TodoItem: FC<IProps> = (props) => {
  const { id, title, checked } = props;

  const { username, password } = useAppSelector((state) => state.comment.logIn);

  const { fetchAsyncDeleteTodo, toggleChecked } = useAction();

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
        {username && password ? (
          <CardActions
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Checkbox
              value={checked}
              onChange={() => toggleChecked(id)}
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600],
                },
              }}
            />

            <Button onClick={() => fetchAsyncDeleteTodo(id)}>
              <RestoreFromTrashRoundedIcon />
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </Grid>
  );
};

export { TodoItem };
