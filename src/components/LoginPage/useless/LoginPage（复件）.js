import { Grid, TextField, Button, Typography, Link } from '@mui/material';
import './LoginPage.css';

function LoginPage() {

  return (
    <Grid container className="container">
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <form className="form">
          <Typography variant="h5" gutterBottom>
            Grozilla
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            className="textField"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            className="textField"
          />
          <Button
            variant="contained"
            color="primary"
            className="button"
          >
            Log In
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            Don't have an account?{' '}
            <Link href="#" underline="always">
              Sign up
            </Link>
          </Typography>
        </form>
      </Grid>
    </Grid>
  );
}

export default LoginPage;