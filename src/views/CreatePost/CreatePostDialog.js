import React, { useState } from 'react';
import { Button, DialogActions, Grid, Chip } from '@mui/material';
import UserInfoWrapper from '../../components/Wrapper/UserInfoWrapper';
import ImageUpload from './ImageUpload';
import PostTitle from './PostTitle';
import SingleLineInput from '../../components/Inputs/SingleLineInput';
import PostContent from './PostContent';
import DialogComponent from '../../components/Wrapper/DialogComponent';
import useS3Upload from '../../Hooks/useS3Upload';
import { createPost } from '../../services/post';

function CreatePostDialog({ isOpen, onClose }) {

  /*==========================================================
  The following are the states and handlers for the left side of the dialog.
  ============================================================*/

  // handle image uploaded to AWS S3
  const [images, setImages] = useState([]);
  const { uploadImageToS3 } = useS3Upload();

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (e) => {
        const updatedImages = [...images];
        updatedImages[index] = e.target.result;
        setImages(updatedImages);

        try {
          const s3Url = await uploadImageToS3(file)
          console.log('s3url', s3Url)
          setImages((prevImages) =>
            prevImages.map((img, i) => i === index ? s3Url : img)
          );
        } catch (err) {
          console.error('Error uploading image to S3', err);
        }
      }
    }
  }

  const handleImageDelete = (event, index) => {
    event.stopPropagation();
    event.preventDefault();
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

  // Create new post

  const CreateNewPost = async () => {
    const newPost = {
      "userid": "sss", // #TODO
      "title": titleContent,
      "content_text": postContents,
      "content_img": images.join(","),
      "coverImg": String(images[0]),
      "content_date": new Date(),
      "tag": tags.join(","),
      "url": "url",
      "location": "location" // #TODO
    }

    console.log('newPost', newPost)

    await createPost(newPost)

    // #TODO add notification for users
    onClose()
  }

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
          <PostTitle titleContent={titleContent} handleTitleChange={handleTitleChange} />
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
              <Button variant="contained" onClick={CreateNewPost}>
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