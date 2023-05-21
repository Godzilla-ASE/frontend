import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import PostCardFooter from '../../components/PostCardFooter';
import { usePostsByTag } from '../../hooks/usePostsbyTag';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { AiFillTag } from 'react-icons/ai';

export default function TagPage() {
  const tag = useParams().tagName
  const posts = usePostsByTag(tag)

  if (!posts) {
    return (
      <pre>Loading</pre>
    )
  }

  const handleImage = (event) => {
    event.target.style.filter = '';
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <Typography variant="h2" color="primary" align='center' textTransform="uppercase">
        <AiFillTag style={{ marginRight: '5px' }} />{tag}
      </Typography>
      <Box sx={{ width: 4 / 5, minHeight: 829, margin: '0 auto', paddingTop: '80px' }}>
        <Masonry columns={5} spacing={2}>
          {posts.map((post, index) => (
            <div key={index}>
              <div>
                <img
                  src={`${post.coverImage}?w=162&auto=format`}
                  srcSet={`${post.coverImage}?w=162&auto=format&dpr=2 2x`}
                  alt={post.title}
                  loading="lazy"
                  style={{
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    display: 'block',
                    width: '100%',
                    filter: 'blur(10px)'
                  }}
                  onLoad={handleImage}
                />
              </div>
              <PostCardFooter post={post} />
            </div>
          ))}
        </Masonry>
      </Box >
    </div>
  )
}
