import { Dialog, styled, Box, DialogTitle, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

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
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        width="100%"
      >
        <Button
          variant="contained"
          color="error"
          startIcon={
            <CloseIcon
              style={{
                verticalAlign: 'middle',
                fontSize: '14px',
                marginRight: 0, // 添加这一行，设置右边距为0
              }}
            />
          }
          onClick={onClose}
          style={{ padding: '6px 8px', minWidth: 'auto', marginTop: '10px', marginRight: '10px' }}
        />
      </Box>
      <StyledDialogContent className={StyledDialogContent}>
        {children}
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default DialogComponent