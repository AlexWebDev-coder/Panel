/** @format */

import { FC } from "react";

import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import { ILogInState } from "../../redux/commentSlice/types";

import { useAction, useAppSelector } from "../../hook/hooks";

const Logout: FC = () => {
  const { logOut } = useAction();
  const { username, password } = useAppSelector((state) => state.comment.logIn);

  const clearData: ILogInState = {
    username: "",
    password: "",
  };

  return (
    <>
      {username && password ? (
        <>
          <Tooltip title="Log Out" arrow>
            <MeetingRoomRoundedIcon
              color={username && password ? "inherit" : "disabled"}
              onClick={() => logOut(clearData)}
            />
          </Tooltip>
        </>
      ) : null}
    </>
  );
};

export { Logout };
