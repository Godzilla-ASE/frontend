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
}));

const AuthorWrapper = ({ post }) => {
  console.log('width', window.innerWidth)
  return (
    <StyledDiv>
      <AuthorInfoWrapper post={post} />
      <ReactionWrapper post={post} />
    </StyledDiv>
  )
}

export default AuthorWrapper
