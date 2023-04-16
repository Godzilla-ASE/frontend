import { Button, Typography } from "@mui/material";

const SubmitButton = ({ buttontext, onClick }) => {
  return (
    <Button onClick={onClick} color="submit" size="small">
      <Typography variant="body2" fontWeight="bold">
        {buttontext}
      </Typography>
    </Button>
  )
}

export default SubmitButton;