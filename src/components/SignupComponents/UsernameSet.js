import React, { useState } from "react";
import { Typography } from "@mui/material";
import StyledTextField from '../Inputs/StyledTextField'

function UsernameSet({ username,
  usernameError,
  usernameexistError,
  setUsername,
  setUsernameError,
  setUsernameexistError,
  setUsernameChanged
}) {
  const [noNameError, setNoNameError] = useState(false)

  const hasSymbol = /[,.?!@#$%^&_=+-]+/

  const handleUsernameChange = (event) => {
    if (event.target.value) {
      setNoNameError(false)
    }
    if (hasSymbol.test(event.target.value)) {
      setUsernameError(true)
    }
    if (usernameError && /^[a-zA-Z0-9]{6,16}$/.test(event.target.value)) {
      setUsernameError(false)
    }
    if (!/^[a-zA-Z0-9]{6,16}$/.test(event.target.value)) {
      setUsernameError(true)
    }
    setUsername(event.target.value);
    setUsernameexistError(false);
    setUsernameChanged(true);

  };

  const handleUserNameBlur = () => {
    if (username.length === 0) {
      setNoNameError(true)
    }
  }

  return (
    <>
      <StyledTextField
        value={username}
        onChange={handleUsernameChange}
        label="Username"
        color="primary"
        focused
        error={noNameError || usernameError || usernameexistError}
        onBlur={handleUserNameBlur}
      />
      <Typography variant="body2" component="div">
        <ul>
          <li style={{ color: (username.length >= 6 && username.length <= 16) ? 'green' : 'white', fontWeight: 700 }}>Between 6-16 characters.</li>
        </ul>
      </Typography>
      {hasSymbol.test(username)
        ? <Typography variant="body2" color="error" align="center" fontWeight={700}>
          Username contains non-alphanumeric characters.
        </Typography>
        : null
      }
      {noNameError &&
        <Typography variant="body2" color="error" align="center" fontWeight={700}>
          What's your name?
        </Typography>
      }
      {usernameexistError &&
        <Typography variant="body2" color="error" align="center" fontWeight={700}>
          This username exists, please try another one.
        </Typography>
      }
    </>
  );
};

export default UsernameSet;