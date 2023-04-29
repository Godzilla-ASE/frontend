import React, { useState } from 'react';
import { Button, Dialog, DialogActions, Grid, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/system';
import UserInfoWrapper from '../../components/Wrapper/UserInfoWrapper';
import ImageUpload from './ImageUpload';
import PostTitle from './PostTitle';
import SingleLineInput from '../../components/Inputs/SingleLineInput';
import PostContent from './PostContent';
import DialogComponent from '../../components/Wrapper/DialogComponent';




function CreatePostDialog({ isOpen, onClose }) {

  /*==========================================================
  The following are the states and handlers for the left side of the dialog.
  ============================================================*/
  const [images, setImages] = useState([]);

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
    <DialogComponent isOpen={isOpen} onClose={onClose}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ImageUpload images={images} handleImageUpload={handleImageUpload} handleImageDelete={handleImageDelete} />
        </Grid>
        <Grid container item xs direction="column" style={{ paddingRight: '15px', paddingBottom: '10px' }}>
          <Grid item xs={1} style={{ paddingTop: '15px' }}>
            {/* Import user avatar and name */}
            <UserInfoWrapper />
          </Grid>
          <PostTitle titleContent={titleContent} handleTitleChange={handleTitleChange}/>
          <PostContent postContent={postContents} rows={8} handleContentChange={handlePostContentsChange} />
          <Grid item xs={1}>
            {/* Add tags for the post */}
            <SingleLineInput placeholder="Add tags (seperate by space)" handleChange={handleTagInputChange} handleKeyDown={handleTagsSubmit} value={tagsInput} />
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
    </DialogComponent>
  );
}

export default CreatePostDialog;