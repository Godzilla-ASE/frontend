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

const SingleLineInput = ({ placeholder, handleChange, handleKeyDown, value }) => {
  return (
    <StyledInput placeholder={placeholder} fullWidth onChange={handleChange} onKeyDown={handleKeyDown} value={value} />
  )
}

export default SingleLineInput