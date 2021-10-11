/** @format */

import { FC, useState, useEffect, ChangeEvent } from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import { Fetchs } from "../../helper";
import { useAction } from "../../hook/hooks";

interface IState {
  username: string;
  password: string;
}

interface IFetchResponse {
  error: boolean;
  body: string;
}

const SignIn: FC = () => {
  const history = useHistory();

  const { loading } = useAction();

  const [data, setData] = useState<IState>({
    username: "",
    password: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (data.username !== "") {
      if (data.password !== "") {
        loading(true);
        await Fetchs(
          "admin/auth",
          {
            username: data.username,
            password: data.password,
          },
          "POST",
          null,
          (response: IFetchResponse) => {
            if (!response.error) {
              localStorage.setItem("token", response.body);
              history.push("/panel");
            }
          }
        );
        loading(false);
      } else alert("Password incorrect");
    } else alert("User name incorrect");
  };

  return (
    <Box className="container">
      <Typography variant="h4">Sign In</Typography>

      <Box className="distance">
        <TextField
          label="User name..."
          value={data.username}
          name="username"
          onChange={(e) => handleChange(e)}
          error={data.username === "" ? true : false}
        />
      </Box>
      <Box className="distance">
        <TextField
          label="Password..."
          value={data.password}
          name="password"
          onChange={(e) => handleChange(e)}
          error={data.password === "" ? true : false}
        />
      </Box>
      <Box className="distance">
        <Button variant="outlined" onClick={handleSubmit}>
          Sign in
        </Button>
      </Box>
    </Box>
  );
};

export { SignIn };
