import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import PostCardFooter from '../../components/PostCardFooter';
import { usePostsByLocation } from '../../Hooks/usePostsByLocation';
import { useParams } from 'react-router-dom';

export default function LocationPage() {
  const location = useParams().locationName
  const posts = usePostsByLocation()

  if (!posts) {
    return (
      <pre>Loading</pre>
    )
  }

  const handleImage = (event) => {
    event.target.style.filter = '';
  };

  return (
    <>
      <h2>{location}</h2>
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
    </>
  )
}
