import {
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    Typography,
  } from '@mui/material';
  import './SignUp.css';
  
  function SignUp() {
    return (
      <Box className="root">
      <Container maxWidth="sm">
        <Grid container justifyContent="center">
          <Grid item xs={10} sm={8} md={6}>
            <Box mt={3} mb={3}>
              <Typography variant="h4" align="center">
                Sign up
              </Typography>
            </Box>
            <Box mt={3} mb={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input id="name" type="text" aria-describedby="name-helper-text" />
                <FormHelperText id="name-helper-text">Enter your full name</FormHelperText>
              </FormControl>
            </Box>
            <Box mt={3} mb={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username" type="text" aria-describedby="username-helper-text" />
                <FormHelperText id="username-helper-text">
                  Must be at least 6 characters, alphanumeric only
                </FormHelperText>
              </FormControl>
            </Box>
            <Box mt={3} mb={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" type="email" aria-describedby="email-helper-text" />
                <FormHelperText id="email-helper-text">Enter your email address</FormHelperText>
              </FormControl>
            </Box>
            <Box mt={3} mb={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" aria-describedby="password-helper-text" />
                <FormHelperText id="password-helper-text">
                  Must be at least 6 characters, alphanumeric only
                </FormHelperText>
              </FormControl>
            </Box>
            <Box mt={3} mb={3}>
              <Button variant="contained" color="primary" fullWidth>
                Sign Up
              </Button>
            </Box>
            <Box mt={3} mb={3}>
              <Typography variant="body2" align="center">
                By signing up, you agree to our Terms, Data Policy and Cookies Policy.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={10} sm={8} md={6}>
            <Box mt={3}>
              <Typography variant="body2" align="center">
                Already have an account?{' '}
                <a href="/login" className="link">
                  Log in
                </a>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
  }
  
  export default SignUp;