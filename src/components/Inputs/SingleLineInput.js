import { InputBase, styled } from "@mui/material";

const StyledInput = styled(InputBase)(({ theme }) => ({
  '& input::placeholder': {
    color: theme.palette.primary.main
  },
  '& input': {
    color: theme.palette.primary.main,
    padding: '10px 0'
  }
}));

const SingleLineInput = ({ placeholder }) => {
  return (
    <StyledInput placeholder={placeholder} fullWidth />
  )
}

export default SingleLineInput