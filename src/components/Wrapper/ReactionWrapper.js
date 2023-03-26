// contains information about the user avatar and name
import { useState } from 'react';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';

const ReactionWrapper = ({ post, user }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLikeClick = () => {
    // update it to communicate with the server
    setLiked(!liked);
  }

  const handleDisLikeClick = () => {
    // update it to communicate with the server
    setDisliked(!disliked);
  }

  return (
    <div className="reactionWrapper">
      <div className="likesWrapper" onClick={handleLikeClick}>
        {liked ? <AiFillLike className="likesIcon" color="#FF4136" size={20} /> : <AiOutlineLike className="likesIcon" color="#818181" size={20} />}
        <span className="likesCount">{post.like.length}</span>
      </div>
      <div className="dislikesWrapper" onClick={handleDisLikeClick}>
        {disliked ? <AiFillDislike className="dislikesIcon" color="#FF4136" size={20} /> : <AiOutlineDislike className="dislikesIcon" color="#818181" size={20} />}
        <span className="dislikesCount">{post.like.length}</span>
      </div>
    </div>
  )
}

export default ReactionWrapper
