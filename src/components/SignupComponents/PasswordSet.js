import {
  Typography
} from "@mui/material";

import StyledTextField from '../Inputs/StyledTextField'

function PasswordSet({
                       password,
                       passwordError,
                       confirmPassword,
                       confirmPasswordError,
                       setPassword,
                       setConfirmPassword,
                       setPasswordError,
                       setConfirmPasswordError,
                     }) {

  const hasLowerCase = /.*[a-z]+.*/;
  const hasUpperCase = /.*[A-Z]+.*/;
  const hasNumber = /.*\d+.*/;
  const hasSymbol = /[,.?!@#$%^&_=+-]+/
  const length8To16 = /^.{8,16}$/;

  const handlePasswordChange = (event) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[,.?!@#$%^&+-_=*]).{8,16}$/.test(event.target.value)) {
      setPasswordError(true);
    } else {
      setPasswordError(false)
    }
    setPassword(event.target.value);

    if (confirmPassword !== event.target.value) {
      setConfirmPasswordError(true)
    } else {
      setConfirmPasswordError(false);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    if (event.target.value !== password) {
      setConfirmPasswordError(true)
    } else {
      setConfirmPasswordError(false);
    }
    setConfirmPassword(event.target.value);

  };

  return (
    <>
      <StyledTextField
        value={password}
        onChange={handlePasswordChange}
        label="Password"
        color="primary"
        focused
        error={passwordError}
      />
      <Typography variant="body2" component="div">
        <ul>
          <li style={{color: length8To16.test(password) ? 'green' : 'white', fontWeight: 700}}>Between 8-16
            characters.
          </li>
          <li style={{color: hasLowerCase.test(password) ? 'green' : 'white', fontWeight: 700}}>Has at least one
            lowercase letter.
          </li>
          <li style={{color: hasUpperCase.test(password) ? 'green' : 'white', fontWeight: 700}}>Has at least one
            uppercase letter.
          </li>
          <li style={{color: hasNumber.test(password) ? 'green' : 'white', fontWeight: 700}}>Has at least one number.
          </li>
          <li style={{color: hasSymbol.test(password) ? 'green' : 'white', fontWeight: 700}}>Has at least one special
            symbol.
          </li>
        </ul>
      </Typography>
      <StyledTextField
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        label="Confirm Password"
        color="primary"
        focused
        error={confirmPasswordError}
      />
    </>
  );
}

export default PasswordSet