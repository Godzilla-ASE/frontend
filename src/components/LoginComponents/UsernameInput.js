import React from "react";
import {
  Typography
} from "@mui/material";
import StyledTextField from '../Inputs/StyledTextField'

function UsernameInput({
  username,
  handleUsernameChange,
  usernameError,
  usernamecorrectError,
}) {

  return (
    <>
      <StyledTextField
        value={username}
        onChange={handleUsernameChange}
        label="Username"
        color="primary"
        focused
        error={usernameError && usernamecorrectError}
      />
      {
        usernameError &&
        <Typography variant="body2" color="error" align="center" fontWeight={700}>
          Please enter your username.
        </Typography>
      }
      {
        usernamecorrectError &&
        <Typography variant="body2" color="error" align="center" fontWeight={700}>
          The username is wrong! Please enter the correct one.
        </Typography>
      }
    </>

    // <FormControl variant="outlined" className="login-input">
    //   <InputLabel htmlFor="username-input">Username</InputLabel>
    //   <OutlinedInput
    //     id="username-input"
    //     type="username"
    //     value={username}
    //     onChange={handleUsernameChange}
    //     label="username"
    //     error={usernameError && usernamecorrectError}
    //   />
    //   {usernameError && (
    //     <FormHelperText sx={{fontSize:'body2.fontSize', color: "red" }}>
    //       Please enter your username.
    //     </FormHelperText>
    //   )}
    //   {usernamecorrectError && (
    //     <FormHelperText sx={{ fontSize:'body2.fontSize', color: "red" }}>
    //       Please enter correct username.
    //     </FormHelperText>
    //   )}
    // </FormControl>
  );
}

export default UsernameInput;