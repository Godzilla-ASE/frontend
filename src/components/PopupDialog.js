import { Dialog } from "@mui/material";
import { styled } from '@mui/system';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.postBackground.main, // 设置您喜欢的背景颜色
  },
}));

const PopupDialog = ({ isOpen, onClose, children }) => {

  return (
    <StyledDialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      {children}
    </StyledDialog>

  )
}

export default PopupDialog