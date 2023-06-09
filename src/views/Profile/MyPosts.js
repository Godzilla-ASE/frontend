import {useState, useEffect} from "react";
import {Typography, Box} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import PostCardFooter from "../../components/PostCardFooter";
import {getPostsByUserID} from "../../services/post";

export default function MyPosts({userid}) {

  const [posts, setPostData] = useState(null);
  // get posts by userID
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostsByUserID(userid);
      setPostData(data);
    };

    fetchData().catch(console.error);
  }, []);

  if (!posts) {
    return (
      <Typography variant="h2" color="primary" style={{textAlign: "center"}}>
        You have No Post So Far.
      </Typography>
    );
  }

  const handleImage = (event) => {
    event.target.style.filter = "";
  };

  return (
    <Box
      sx={{width: 3 / 5, minHeight: 829, margin: "0 auto", paddingTop: "1%"}}
    >
      <Masonry columns={3} spacing={3}>
        {posts.map((post, index) => (
          <div key={post.title}>
            <div>
              <img
                src={`${post.coverImage}?w=162&auto=format`}
                srcSet={`${post.coverImage}?w=162&auto=format&dpr=2 2x`}
                alt={post.title}
                loading="lazy"
                style={{
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                  display: "block",
                  width: "100%",
                  filter: "blur(10px)",
                }}
                onLoad={handleImage}
              />
            </div>
            <PostCardFooter post={post}/>
          </div>
        ))}
      </Masonry>
    </Box>
  );
}
