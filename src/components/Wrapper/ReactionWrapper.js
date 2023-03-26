// contains information about the user avatar and name
import { useState } from 'react';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'

const ReactionWrapper = ({ post, user }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const navigate = useNavigate();

  console.log('post', post);

  const handleLikeClick = () => {
    // add communication to the server
    if (!user) {
      navigate('/login')
    } else {
      setLiked(!liked);
    }
  }

  const handleDisLikeClick = () => {
    // add communication to the server
    if (!user) {
      navigate('/login')
    } else {
      setDisliked(!disliked);
    }
  }

  return (
    <div className="reactionWrapper">
      <div className="likesWrapper" onClick={handleLikeClick}>
        {liked ? <AiFillLike className="likesIcon" color="#FF4136" size={20} /> : <AiOutlineLike className="likesIcon" color="#818181" size={20} />}
        {/* {post.like.length > 0 ? <span className="likesCount">{post.like.length}</span> : null} */}
        {post.like > 0 ? <span className="likesCount">{post.like}</span> : null}
      </div>
      <div className="dislikesWrapper" onClick={handleDisLikeClick}>
        {disliked ? <AiFillDislike className="dislikesIcon" color="#FF4136" size={20} /> : <AiOutlineDislike className="dislikesIcon" color="#818181" size={20} />}
        {post.unlike > 0 ? <span className="dislikesCount">{post.unlike}</span> : null}
      </div>
    </div>
  )
}

export default ReactionWrapper
