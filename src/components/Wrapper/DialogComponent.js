import { Dialog, styled, Box, DialogContent, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { useTheme } from "@emotion/react";
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.default,
  },
}));

const StyledDialogContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
}));

const DialogComponent = ({ children, isOpen, onClose }) => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(1282));

  const windowHeight = window.innerHeight;
  const marginTopPercent = 0.16;
  const dialogStyle = {
    marginTop: isSmallScreen
      ? windowHeight * marginTopPercent
      : windowHeight * marginTopPercent,
    maxHeight: `calc(100% + 10px - ${windowHeight * marginTopPercent}px)`,
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: dialogStyle
      }}
    >
      <StyledDialogContent className={StyledDialogContent}>
        {children}
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default DialogComponent