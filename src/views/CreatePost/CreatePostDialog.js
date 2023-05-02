import React, { useState } from 'react';
import { Button, DialogActions, Grid, Chip } from '@mui/material';
import UserInfoWrapper from '../../components/Wrapper/UserInfoWrapper';
import ImageUpload from './ImageUpload';
import Location from './Location'
import PostTitle from './PostTitle';
import PostContent from './PostContent';
import SingleLineInput from '../../components/Inputs/SingleLineInput';
import DialogComponent from '../../components/Wrapper/DialogComponent';
import useS3UploadWithProgress from '../../Hooks/useS3UploadWithProgress';
import { createPost } from '../../services/post';
import useLoggedInUser from '../../components/Helper/useLoggedInUser';
import Notification from '../../components/Notification'

function CreatePostDialog({ isOpen, onClose }) {

  const user = useLoggedInUser()

  /*==========================================================
 The following are the states for the notication
 ============================================================*/
  const [titleNotification, setTitleNotification] = useState(false)
  const [contentNotification, setContentNotification] = useState(false)
  const [imageNotification, setImageNotification] = useState(false)

  /*==========================================================
  The following are the states and handlers for the left side of the dialog.
  ============================================================*/

  // handle image uploaded to AWS S3
  const [images, setImages] = useState([]);
  const { uploadImageToS3 } = useS3UploadWithProgress();
  const [uploadProgress, setUploadProgress] = useState(Array(9).fill(0))


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
          const s3Url = await uploadImageToS3(file, index, setUploadProgress)
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

  // handle the location
  const [location, setLocation] = useState('');

  // Create new post

  const CreateNewPost = async () => {

    if (!titleContent) {
      setTitleNotification(true)
      return
    } else if (!postContents) {
      setContentNotification(true)
      return
    } else if (!images[0]) {
      setImageNotification(true)
      return
    }

    const newPost = {
      "userid": user.userID, // #TODO
      "title": titleContent,
      "content_text": postContents,
      "content_img": images.join(","),
      "coverImage": String(images[0]),
      "content_date": new Date(),
      "tag": tags.join(","),
      "url": "url",
      "location": location // #TODO
    }

    console.log('newPost', newPost)

    try {
      await createPost(newPost)
      setPostContents('')
      setTitleContent('')
      setImages([])
      setTags([])
      setLocation('')

      // #TODO add newpost to homepage

      // #TODO add titleNotification for users
      onClose()
    } catch (error) {
      console.error('Error creating new post', error)
    }
  }

  // handle canceling
  const handleCancel = () => {
    setPostContents('')
    setTitleContent('')
    setImages([])
    setTags([])
    setLocation('')
    onClose()
  }

  return (
    <>
      <DialogComponent isOpen={isOpen} onClose={handleCancel}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <ImageUpload images={images} handleImageUpload={handleImageUpload} handleImageDelete={handleImageDelete} progress={uploadProgress} />
          </Grid>
          <Grid container item xs direction="column" style={{ paddingRight: '15px', paddingBottom: '10px' }}>
            <Grid item xs={1} style={{ paddingTop: '15px' }}>
              {/* Import user avatar and name */}
              <UserInfoWrapper />
            </Grid>
            <PostTitle titleContent={titleContent} handleTitleChange={handleTitleChange} />
            <PostContent postContent={postContents} rows={8} handleContentChange={handlePostContentsChange} />
            <Grid item xs={1}>
              <Location location={location} setLocation={setLocation} />
            </Grid>
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
                <Button variant="contained" color="error" onClick={handleCancel}>
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
      {
        titleNotification && (
          <Notification
            status="error"
            content="The post must have a title!"
            closeCallback={() => setTitleNotification(false)}
          />
        )
      }
      {
        contentNotification && (
          <Notification
            status="error"
            content="The post must have contents!"
            closeCallback={() => setContentNotification(false)}
          />
        )
      }
      {
        imageNotification && (
          <Notification
            status="error"
            content="The post must have at least one image!"
            closeCallback={() => setImageNotification(false)}
          />
        )
      }
    </>
  );
}

export default CreatePostDialog;