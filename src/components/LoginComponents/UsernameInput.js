import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";

function UsernameInput({
  username,
  handleUsernameChange,
  usernameError,
  usernamecorrectError,
}) {
  return (
    <FormControl variant="outlined" className="login-input">
      <InputLabel htmlFor="username-input">Username</InputLabel>
      <OutlinedInput
        id="username-input"
        type="username"
        value={username}
        onChange={handleUsernameChange}
        label="username"
        error={usernameError && usernamecorrectError}
      />
      {usernameError && (
        <FormHelperText sx={{ color: "red" }}>
          Please enter your username.
        </FormHelperText>
      )}
      {usernamecorrectError && (
        <FormHelperText sx={{ color: "red" }}>
          Please enter correct username.
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default UsernameInput;