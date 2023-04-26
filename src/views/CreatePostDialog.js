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
  Chip
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
  flexDirection: 'row'
}));

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

const placeholder = (
  // Design a placeholder for the prompt message component to achieve consistent user interface in the reminder area.
  <Typography variant="body2" color="error" fontWeight={700} sx={{ visibility: 'hidden' }}>
    Exceeded the character limit.
  </Typography>
);


function CreatePostDialog({ isOpen, onClose }) {
  const [images, setImages] = useState([]);
  const [postContents, setPostContents] = useState('')
  const [titleContent, setTitleContent] = useState('')
  const [tagsInput, setTagsInput] = useState('');
  const [tags, setTags] = useState([]);
  console.log('tags', tags)

  const handleTagInputChange = (event) => {
    setTagsInput(event.target.value);
  };

  const handleTagsSubmit = (event) => {
    if (event.key === ' ' && tagsInput) {
      event.preventDefault();
      setTags(tags.concat(tagsInput));
      setTagsInput('');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handlePostContentsChange = (event) => {
    setPostContents(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitleContent(event.target.value);
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
          <Grid item xs={8} sx={{ padding: '10px' }}>
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
          <Grid container item xs direction="column" style={{ paddingRight: '15px', paddingBottom: '10px' }}>
            <Grid item xs={1} style={{ paddingTop: '15px' }}>
              <UserInfoWrapper />
            </Grid>
            <Grid item xs={1}>
              <CustomSingleLine
                placeholder="Write a title..."
                fullWidth
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid item container direction="row" alignItems="center">
              <Grid item xs>
                {titleContent.length > 20 ? (
                  <Typography variant="body2" color="error" fontWeight={700}>
                    Exceeded the character limit.
                  </Typography>
                ) : (
                  placeholder
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2" color="secondary.main" sx={{ textAlign: 'right' }}>
                  {titleContent.length}/20
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs>
              <CustomMultiline
                placeholder="Write the contents..."
                fullWidth
                multiline
                rows={8} // if the ui of this part is a bit strange, change to autosize textarea component
                onChange={handlePostContentsChange}
              />
            </Grid>
            <Grid item container direction="row" alignItems="center">
              <Grid item xs>
                {postContents.length > 1000 ? (
                  <Typography variant="body2" color="error" fontWeight={700}>
                    Exceeded the character limit.
                  </Typography>
                ) : (
                  placeholder
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2" color="secondary.main" sx={{ textAlign: 'right' }}>
                  {postContents.length}/1000
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <CustomSingleLine
                placeholder="Add tags (seperate by space)"
                fullWidth
                value={tagsInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagsSubmit}
              />
            </Grid>
            <Grid item xs={2}>
              {tags.map((tag, index) => (
                <Chip key={index} label={tag} color="primary" variant="outlined" style={{ marginRight: '8px', marginBottom: '8px' }} onDelete={() => handleTagDelete(tag)} />
              ))}
            </Grid>
            <Grid item xs={1}>
              <DialogActions style={{ paddingRight: '0px' }}>
                <Button variant="contained" color="error" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={onClose}>
                  Post
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Grid>
      </StyledDialogContent>

    </CreatePostDialogCompo>
  );
}

export default CreatePostDialog;
