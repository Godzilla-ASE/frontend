import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import UserInfoWrapper from '../components/Wrapper/UserInfoWrapper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

const CustomSingleLine = styled(InputBase)(({ theme }) => ({
  // 设置占位符文本的样式
  '& input::placeholder': {
    color: theme.palette.primary.main
  },
  // 设置输入框的样式
  '& input': {
    color: theme.palette.primary.main,
    padding: '10px 0'
  }
}));

const CustomMultiline = styled(InputBase)(({ theme }) => ({
  // 设置占位符文本的样式
  '& textarea::placeholder': {
    color: theme.palette.primary.main,
  },
  // 设置输入框的样式
  '& textarea': {
    color: theme.palette.primary.main,
    padding: '10px 0',
  },
}));


const StyledDialogContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  // padding: '1em 0.5em'
}));

// const StyledDialogContent = styled(DialogContent)({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center'
// });

const CreatePostDialogCompo = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.postBackground.main, // 设置您喜欢的背景颜色
  },
}));


const ImageGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
}));

const ImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(1),
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
}));

const RightPanelWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  '& > *': {
    marginBottom: '16px', // 为每个子组件添加下边距
  },
});


function CreatePostDialog({ isOpen, onClose }) {
  const [images, setImages] = useState([]);
  const [postContents, setPostContents] = useState('')

  const handlePostContentsChange = (event) => {
    setPostContents(event.target.value);
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const updatedImages = [...images];
      updatedImages[index] = e.target.result;
      setImages(updatedImages);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  return (
    <CreatePostDialogCompo open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogContent className={StyledDialogContent}>
        <Grid container spacing={2}>
          <Grid id="ImagesBox" item xs={8} sx={{ padding: '10px' }}>
            <Grid container className={ImageGrid} spacing={1} sx={{ height: '100%' }}>
              {Array.from({ length: 9 }).map((_, index) => (
                <Grid item xs={4} key={index}>
                  <Box
                    className={ImageBox}
                    sx={{
                      width: '100%',
                      height: 0,
                      paddingBottom: '100%',
                      position: 'relative',
                    }}
                  >
                    {images[index] && (
                      <IconButton
                        className={CloseButton}
                        onClick={() => handleImageDelete(index)}
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                    <label htmlFor={`image-upload-${index}`}>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id={`image-upload-${index}`}
                        type="file"
                        onChange={(e) => handleImageUpload(e, index)}
                      />
                      {images[index] ? (
                        <Box
                          component="img"
                          alt=""
                          src={images[index]}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute', // 使用绝对定位
                            top: 0,
                            left: 0,
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute', // 使用绝对定位
                            top: 0,
                            left: 0,
                            display: 'flex',
                            alignItems: 'center', // 垂直居中
                            justifyContent: 'center', // 水平居中
                            cursor: 'pointer',
                          }}
                        >
                          <AddAPhotoIcon
                            sx={{
                              fontSize: 20, // 设置大小
                              color: 'secondary.main', // 设置颜色为主题的主要颜色
                            }}
                          />
                        </Box>
                      )}
                    </label>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <UserInfoWrapper sx={{ flexGrow: 1 }} />
            <CustomSingleLine placeholder="Write a title..." fullWidth />
            <CustomMultiline
              placeholder="Write the contents..."
              fullWidth
              multiline
              rows={6}
              onChange={handlePostContentsChange}
            />
            <Typography variant="body2" color="secondary.main" sx={{ textAlign: 'right' }}>
              {postContents.length}/1000
            </Typography>
            {postContents.length > 1000 && (
              <Typography variant="caption" color="error">
                You have exceeded the maximum character limit.
              </Typography>
            )}
            <DialogActions>
              <Button variant="contained" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={onClose}>
                Post
              </Button>
            </DialogActions>
          </Grid>

        </Grid>
      </StyledDialogContent>

    </CreatePostDialogCompo>
  );
}

export default CreatePostDialog;
