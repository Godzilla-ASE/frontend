import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import PostCardFooter from '../../components/PostCardFooter';
import { usePostValue } from '../../context/PostContext';
import { usePosts } from '../../Hooks/usePosts';
// import { usePosts } from '../../components/Helper/usePosts';

export default function Homepage() {
  usePosts()
  // const posts = usePostValue()
  const posts = usePostValue().posts;

  if (!posts) {
    return (
      <div style={{ height: 829, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p> Loading </p>
      </div>
    )
  }

  const handleImage = (event) => {
    event.target.style.filter = '';
  };

  return (
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
    </Box>
  )
}
