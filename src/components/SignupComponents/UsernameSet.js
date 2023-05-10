import React, { useState } from "react";
import { FormControl, InputLabel, OutlinedInput, FormHelperText, TextField, styled, Typography } from "@mui/material";
import StyledTextField from '../Inputs/StyledTextField'

function UsernameSet({ username,
  usernameError,
  usernameexistError,
  setUsername,
  setUsernameError,
  setUsernameexistError,
  setPageStatus,
  setUsernameChanged
}) {
  const [noNameError, setNoNameError] = useState(false)

  // #TODO 转移 usernameError， setUserNameError 到这个组件

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
    setPageStatus("");
  };

  const handleUserNameBlur = () => {
    if (username.length === 0) {
      setNoNameError(true)
    }
    // #TODO handleBlur 的作用就是当用户的 focus 转移时会触发的动作，感觉可以把向后端请求 usernameexist 放到这里
  }

  return (
    <>
      {/* <FormControl variant="outlined" className="signup-input"> */}
      {/* <InputLabel htmlFor="username-input" shrink="true">Username</InputLabel> */}
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
          <li style={{ color: (username.length >= 6 && username.length <= 16) ? 'green' : 'white', fontWeight: 700 }}>Between 6-16 charaters.</li>
        </ul>
      </Typography>
      {/* {(usernameError && username.length < 6)
        ? <Typography variant="body2" color="error" align="center" fontWeight={700}>
          Username is too short. It has to be at least 6 characters.
        </Typography>
        : null
      } */}
      {hasSymbol.test(username)
        ? <Typography variant="body2" color="error" align="center" fontWeight={700}>
          Username contains non-alphanumeric characters.
        </Typography>
        : null
      }
      {/* {(usernameError && username.length > 16)
        ? <Typography variant="body2" color="error" align="center" fontWeight={700}>
          Username is too long. It has to be no more than 16 characters.
        </Typography>
        : null
      } */}
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
      {/* {
        <FormHelperText sx={{ fontSize: 'body2.fontSize', color: usernameError ? 'red' : 'white' }}>
          Must be between 6 and 16 characters, alphanumeric only
        </FormHelperText>} */}
      {/* </FormControl> */}
    </>
  );
};

export default UsernameSet;