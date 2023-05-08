// contains information about the post author: user avatar and name, likes button and the count of likes
import AuthorInfoWrapper from "./AuthorInfoWrapper"
import ReactionWrapper from "./ReactionWrapper"
import { styled } from '@mui/system';

const StyledDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '10px',
  [theme.breakpoints.up(1291)]: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  [theme.breakpoints.down(1290)]: {
    flexDirection: 'column',
  },
  cursor: 'pointer',
}));

const AuthorWrapper = ({ post }) => {

  const openProfile = (userid) => {
    // go to profile
  }

  return (
    <StyledDiv onClick={() => openProfile(post.userid)}>
      <AuthorInfoWrapper post={post} styleSetting="space-between" />
      <ReactionWrapper post={post} />
    </StyledDiv>
  )
}

export default AuthorWrapper
