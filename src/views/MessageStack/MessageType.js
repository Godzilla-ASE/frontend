import AuthorInfoWrapper from "../../components/Wrapper/AuthorInfoWrapper"
import { Typography } from "@mui/material"
import { Link } from 'react-router-dom'

export const FollowMessage = ({ message }) => {
  return (
    <>
      <AuthorInfoWrapper post={message} styleSetting="start" />
      <Typography variant="body1" color="secondary">
        started to follow you.
      </Typography>
      {/* follow back button */}
    </>
  )
}

export const LikeMessage = ({ message, handleMessageDialog }) => {
  return (
    <>
      <AuthorInfoWrapper post={message} styleSetting="start" />
      <Typography variant="body1" color="secondary">
        liked your post: <Link to={`/post/${message.send_to_client_id}`} style={{ color: '#ffffff' }} onClick={handleMessageDialog}>{message.send_to_client}</Link>
      </Typography>
      {/* link to your post */}
    </>
  )
}

export const CommentMessage = ({ message }) => {
  return (
    <>
      <AuthorInfoWrapper post={message} styleSetting="start" />
      <Typography variant="body1" color="secondary">
        commented: {message.send_to_client}
      </Typography>
      {/* link to your post */}
    </>
  )
}

export const ReplyMessage = ({ message }) => {
  return (
    <>
      <AuthorInfoWrapper post={message} styleSetting="start" />
      <Typography variant="body1" color="secondary">
        replied: {message.send_to_client}
      </Typography>
      {/* link to your post */}
    </>
  )
}