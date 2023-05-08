// contains information about the user avatar and name
import { Typography, Avatar } from "@mui/material"
import { styled } from '@mui/system';

const AuthorInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});


const AuthorInfoWrapper = ({ post }) => {
  let username
  let userAvatar
  
  if (!post) {
    return (
      <div style={{ height: 829, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p> Loading post </p>
      </div>
    )
  }
  
  const date = post.creation_date.slice(0, 10)
  
  if (post.username_from == null) {
    username = post.username;
    userAvatar = post.user_avatar
  } else {
    username = post.username_from;
    userAvatar = post.userAvatar_from
  }
  return (
    <AuthorInfo>
      <Avatar
        src={userAvatar}
        alt={`${username}'s avatar`}
        sx={{ width: 25, height: 25, marginRight: 1 }}
      />
      <Wrapper>
        <Typography variant="body2" color="secondary" fontWeight="bold">
          {username}
        </Typography>
        <Typography variant="body3" color="secondary">
          {date}
        </Typography>
      </Wrapper>
    </AuthorInfo>
  )
}

export default AuthorInfoWrapper
