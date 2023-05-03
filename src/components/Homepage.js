import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import PostCardFooter from './PostCardFooter';
import { usePosts } from './Helper/usePosts';

export default function Homepage() {

  //localStorage.setItem("authToken", authToken);
  //localStorage.setItem("userID", userID);
  const fakeUser = {
    authToken: "23e5e8d1-a521-4149-b3f9-fff222eec957",
    userID: 3,
    avatar: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Favatar-icon&psig=AOvVaw3gIUhfkN91Gd-Mmfpuc98H&ust=1682966291470000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKCy0pGg0v4CFQAAAAAdAAAAABAE"
  }

  localStorage.setItem("loggedInUser", JSON.stringify(fakeUser));

  const posts = usePosts()

  if (!posts) {
    return (
      // #TODO Loading
      <pre>Loading</pre>
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
    </Box >
  )
}
