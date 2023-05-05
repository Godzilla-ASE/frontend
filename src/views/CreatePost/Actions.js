import { Grid, DialogActions, Button } from "@mui/material"

const Actions = ({ handleCancel, CreateNewPost }) => {
  return (
    <Grid item xs={1}>
      <DialogActions style={{ paddingRight: '0px' }}>
        <Button variant="contained" color="error" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={CreateNewPost}>
          Post
        </Button>
      </DialogActions>
    </Grid>
  )
}

export default Actions
