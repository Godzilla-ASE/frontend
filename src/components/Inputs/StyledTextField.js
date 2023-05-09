
import { TextField, styled } from "@mui/material";

const StyledInput = styled(TextField)(({ theme }) => ({
  '& input::placeholder': {
    color: theme.palette.primary.main
  },
  '& input': {
    color: theme.palette.primary.main
  }
}));

const StyledTextField = ({ children, value, onChange, label, placeholder, error, color, onBlur }) => {

  return (
    <StyledInput value={value}
      onChange={onChange}
      label={label}
      placeholder={placeholder}
      color={color}
      focused
      error={error}
      onBlur={onBlur}>
      {children}
    </StyledInput>
  )

}

export default StyledTextField