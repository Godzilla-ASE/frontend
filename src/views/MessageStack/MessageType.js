import AuthorInfoWrapper from "../../components/Wrapper/AuthorInfoWrapper"
import { Typography } from "@mui/material"

export const FollowMessage = ({ message }) => {
  return (
    <>
      <AuthorInfoWrapper post={message} />
      <Typography variant="body1" color="secondary">
        started to follow you.
      </Typography>
      {/* follow back button */}
    </>
  )
}

export const LikeMessage = ({ message }) => {
  return (
    <>
      <AuthorInfoWrapper post={message} />
      <Typography variant="body1" color="secondary">
        liked your post.
      </Typography>
      {/* link to your post */}
    </>
  )
}

export const CommentMessage = ({ message }) => {
  return (
    <>
      <AuthorInfoWrapper post={message} />
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
      <AuthorInfoWrapper post={message} />
      <Typography variant="body1" color="secondary">
        replied: {message.send_to_client}
      </Typography>
      {/* link to your post */}
    </>
  )
}