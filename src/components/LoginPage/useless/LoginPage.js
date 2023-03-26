import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
  Link,
} from '@mui/material';
import './LoginPage.css';

function LoginPage() {
  return (
    <Box className="root">
      <Container maxWidth="sm" className="container">
        <Box mt={3} mb={3}>
          <Typography variant="h4" align="center">
            Godzilla
          </Typography>
        </Box>
        <Box mt={3} mb={3}>
          <FormControl className="formControl">
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" type="text" aria-describedby="username-helper-text" />
            <FormHelperText id="username-helper-text">Enter your username</FormHelperText>
          </FormControl>
        </Box>
        <Box mt={3} mb={3}>
          <FormControl className="formControl">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" aria-describedby="password-helper-text" />
            <FormHelperText id="password-helper-text">Enter your password</FormHelperText>
          </FormControl>
        </Box>
        <Box mt={3} mb={3}>
          <Typography variant="body2" align="center">
            <Link href="#" className="link">
              Forgot password?
            </Link>
          </Typography>
        </Box>
        <Box mt={3} mb={3}>
          <Button variant="contained" color="primary" className="button">
            Log In
          </Button>
        </Box>

        <Box mt={3} mb={3}>
          <Typography variant="body2" align="center">
            No Account? &nbsp;
            <Link href="#" className="link">
              Sign Up
            </Link>
          </Typography>
        </Box>
        
      </Container>
    </Box>
  );
}

export default LoginPage;