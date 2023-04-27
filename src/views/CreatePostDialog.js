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



const ImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(1),
}));

const placeholder = (
  // Design a placeholder for the prompt message component to achieve consistent user interface in the reminder area.
  <Typography variant="body2" color="error" fontWeight={700} sx={{ visibility: 'hidden' }}>
    Exceeded the character limit.
  </Typography>
);


function CreatePostDialog({ isOpen, onClose }) {

  /*==========================================================
  The following are the states and handlers for the left side of the dialog.
  ============================================================*/
  const [images, setImages] = useState([]);
  console.log('images', images)
  console.log('images.filter(Boolean).length', images.filter(Boolean).length)

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

  const handleImageDelete = (event, index) => {
    event.stopPropagation();
    event.preventDefault();
    // const updatedImages = [...images];
    // updatedImages[index] = null;
    setImages(images.filter((_, i) => i !== index));
  };

  /*==========================================================
  The following are the states and handlers for the right side of the dialog.
  ============================================================*/
  // Control the word limit of content input
  const [postContents, setPostContents] = useState('')

  const handlePostContentsChange = (event) => {
    setPostContents(event.target.value);
  };

  // Control the title limit of content input
  const [titleContent, setTitleContent] = useState('')

  const handleTitleChange = (event) => {
    setTitleContent(event.target.value);
  };

  // Add and delete the tags
  const [tagsInput, setTagsInput] = useState('');
  const [tags, setTags] = useState([]);

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

  return (
    <CreatePostDialogCompo open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogContent className={StyledDialogContent}>
        <Grid container spacing={2}>
          {/* sx={{ padding: '10px' }} */}
          <Grid item xs={8}>
            
          </Grid>
          <Grid container item xs direction="column" style={{ paddingRight: '15px', paddingBottom: '10px' }}>
            <Grid item xs={1} style={{ paddingTop: '15px' }}>
              {/* Import user avatar and name */}
              <UserInfoWrapper />
            </Grid>
            <Grid item xs={1}>
              {/* Enter post title */}
              <CustomSingleLine
                placeholder="Write a title..."
                fullWidth
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid item container direction="row" alignItems="center">
              {/* Control the word limit for the title: a message if the limit is exceeded & a word counter */}
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
              {/* Enter the post contents */}
              <CustomMultiline
                placeholder="Write the contents..."
                fullWidth
                multiline
                rows={8} // if the ui of this part is a bit strange, change to autosize textarea component
                onChange={handlePostContentsChange}
              />
            </Grid>
            <Grid item container direction="row" alignItems="center">
              {/* Control the word limit for the content: a message if the limit is exceeded & a word counter */}
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
              {/* Add tags for the post */}
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
      </StyledDialogContent >
    </CreatePostDialogCompo >
  );
}

export default CreatePostDialog;