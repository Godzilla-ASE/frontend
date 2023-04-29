import { Dialog, styled, Box } from "@mui/material";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.postBackground.main, // 设置您喜欢的背景颜色
  },
}));

const StyledDialogContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row'
}));

const DialogComponent = ({ children, isOpen, onClose }) => {
  return (
    <StyledDialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogContent className={StyledDialogContent}>
        {children}
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default DialogComponent