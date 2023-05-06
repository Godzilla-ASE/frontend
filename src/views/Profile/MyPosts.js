import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
<<<<<<< HEAD:src/views/Profile/MyPosts.js
import PostCardFooter from '../../components/PostCardFooter';
import { usePosts } from '../../components/Helper/usePosts';
import { getAll, getPostsByUserID } from '../../services/post';
=======
import PostCardFooter from './PostCardFooter';
import { usePosts } from '../hooks/usePosts';
import { getAll, getPostsByUserID } from '../services/post';
>>>>>>> origin/main:src/components/MyPosts.js

export default function MyPosts(userid) {
  //console.log(userid);

<<<<<<< HEAD:src/views/Profile/MyPosts.js
    const [posts, setPostData] = useState(null);
    // 根据ID取该用户的帖子
    useEffect(() => {
        const fetchData = async () => {
        const data = await getPostsByUserID(userid)
        setPostData(data)
=======
  const [posts, setPostData] = useState(null);
  // 根据ID取该用户的帖子
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAll()
      //const data = await getPostsByUserID(userid)
      setPostData(data)
>>>>>>> origin/main:src/components/MyPosts.js
    }

    fetchData().catch(console.error)
  }, []);

  if (!posts) {
    return (
      // #TODO Loading
      <Typography variant="h2" color="primary" style={{ textAlign: 'center' }}>
        You have No Post So Far.
      </Typography>
    )
  }

  const handleImage = (event) => {
    event.target.style.filter = '';
  };

  return (
    <Box sx={{ width: 3 / 5, minHeight: 829, margin: '0 auto', paddingTop: '1%' }}>
      <Masonry columns={2} spacing={2}>
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
