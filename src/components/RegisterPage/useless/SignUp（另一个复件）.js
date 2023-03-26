import {React,useState} from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
  } from '@mui/material';
  import './SignUp.css';
  
  function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
    };
  
    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);
      console.log("Is Checked:", isChecked);
    };
  
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "360px",
            padding: "32px",
            border: "1px solid grey",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4"  align="center">
            Godzilla
          </Typography>
          <Typography>Sign up to see photos and videos from your friends.</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <FormControl variant="outlined">
              <InputLabel htmlFor="email-input">Email</InputLabel>
              <OutlinedInput
                id="email-input"
                type="email"
                value={email}
                onChange={handleEmailChange}
                label="Email"
              />
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="password-input">Password</InputLabel>
              <OutlinedInput
                id="password-input"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <Button color="primary" size="small">
                      Forgot?
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="confirm-password-input">Confirm Password</InputLabel>
              <OutlinedInput
                id="confirm-password-input"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                label="Confirm Password"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
              label="I agree to the terms and conditions"
            />
            <Typography variant="body2" color="textSecondary">
            By signing up, you agree to our Terms, Data Policy and Cookies Policy.
          </Typography>
            <Button variant="contained" color="primary" type="submit">
              Sign up
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
  
  export default SignUp;