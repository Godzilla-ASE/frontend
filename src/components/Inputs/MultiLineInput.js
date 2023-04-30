import { InputBase, styled } from "@mui/material";

const StyledMultiLine = styled(InputBase)(({ theme }) => ({
  // Set the placeholder text style
  '& textarea::placeholder': {
    color: theme.palette.primary.main,
  },
  // Set the input area style
  '& textarea': {
    color: theme.palette.primary.main,
    padding: '10px 0',
  },
}));

const MultiLineInput = ({ placeholder, rows, handleChange, value }) => {
  return (
    <StyledMultiLine placeholder={placeholder} fullWidth multiline rows={rows} onChange={handleChange} value={value} />
  )
}

export default MultiLineInput