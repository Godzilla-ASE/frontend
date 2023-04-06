import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import PostCardFooter from './PostCardFooter';

export default function Homepage({ data }) {

  const handleImage = (event) => {
    event.target.style.filter = '';
  };

  return (
    <Box sx={{ width: 4 / 5, minHeight: 829, margin: '0 auto', paddingTop: '80px' }}>
      <Masonry columns={5} spacing={4}>
        {data.map((item, index) => (
          <div key={index}>
            <div>
              <img
                src={`${item.coverImage}?w=162&auto=format`}
                srcSet={`${item.coverImage}?w=162&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                  display: 'block',
                  width: '100%',
                  filter: 'blur(10px)'
                }}
                onLoad={handleImage}
              />
            </div>
            <PostCardFooter post={item} />
          </div>
        ))}
      </Masonry>
    </Box >
  )
}
