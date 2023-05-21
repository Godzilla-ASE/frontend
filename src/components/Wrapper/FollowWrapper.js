import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import {
  getOneUserInfo,
  addFollower,
  cancelFollower,
} from "../../services/user";
import Notification from "../Notification";

export default function FollowWapper({ loginUser, id }) {
  const [UserInfo, setUserInfo] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [successFollow, setSuccessFollow] = useState("");
  const [successUnfollow, setSuccessUnfollow] = useState("");
  const navigate = useNavigate();

  // Retrieve the information about the user being followed
  useEffect(() => {
    const fetchData = async () => {
      const result = await getOneUserInfo(id);
      setUserInfo(result);
    };
    fetchData();
  }, [id]);

  // Determine whether the current logged-in user has followed this user
  useEffect(() => {
    if (UserInfo !== null && loginUser) {
      const authorFans = UserInfo.fans.split(",");
      const loginUserID = loginUser.id;
      if (authorFans.includes(loginUserID.toString())) {
        setFollowed(true);
      } else {
        setFollowed(false);
      }
    }
  }, [UserInfo, id, loginUser]);

  if (!UserInfo) {
    return <pre>Loading.UserInfo..</pre>;
  }
  if (loginUser && loginUser.id.toString() === id.toString()) {
    return <div></div>;
  }

  const handleFollowClick = () => {
    if (!loginUser) {
      navigate("/login");
    } else {
      if (followed) {
        cancelFollower(loginUser.id, id, loginUser.authToken);
        setSuccessUnfollow(`Successfully unfollow user ${id} !`);
      } else {
        addFollower(loginUser.id, id, loginUser.authToken);
        setSuccessFollow(`Successfully follow user ${id} !`);
      }
      setFollowed(!followed);
    }
  };

  return (
    <>
      <div>
        {!followed ? (
          <Button onClick={handleFollowClick} variant="contained" size="small">
            <Typography variant="body2" fontWeight="bold">
              Follow
            </Typography>
          </Button>
        ) : (
          <Button onClick={handleFollowClick} size="small">
            <Typography variant="body2" fontWeight="bold">
              Unfollow
            </Typography>
          </Button>
        )}
      </div>
      {!!successFollow && (
        <Notification
          status="success"
          content={successFollow}
          closeCallback={() => setSuccessFollow("")}
        />
      )}
      {!!successUnfollow && (
        <Notification
          status="success"
          content={successUnfollow}
          closeCallback={() => setSuccessUnfollow("")}
        />
      )}
    </>
  );
}
