import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Stack, Paper, Box, styled } from '@mui/material';
import { FollowMessage, ReplyMessage, CommentMessage, LikeMessage } from './MessageType';
import DialogComponent from '../../components/Wrapper/DialogComponent';

const FullWidthBox = styled(Box)(({ theme }) => ({
  width: '100%',
}));

const MessageStack = ({ isOpen, onClose }) => {
  // const userId = 1
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 创建并激活 STOMP 客户端
    const newClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:3001/ase-websocket'),
      onConnect: () => {
        console.log('Connected');

        // 订阅消息监听接口
        newClient.subscribe(`/topic/post/${userId}`, (message) => {
          const data = JSON.parse(message.body);
          setMessages((prevMessages) => [data, ...prevMessages]);
        });
      },
    });

    setClient(newClient);
    newClient.activate();

    // 在组件卸载时关闭 STOMP 客户端
    return () => newClient.deactivate();
  }, [userId]);

  // const messages = [
  //   {
  //     id: 1,
  //     type: "LIKE_POST",
  //     userid_from: 1,
  //     userid_to: 2,
  //     username_from: "u1",
  //     username_to: "u2",
  //     userAvatar_from: "https://media.istockphoto.com/id/1331335536/vector/female-avatar-icon.jpg?s=170667a&w=0&k=20&c=-iyD_53ZEeZPc4SmvmGB1FJXZcHy_fvbJBv6O8HblHs=",
  //     userAvatar_to: "path2",
  //     send_to_client_id: 1,
  //     send_to_client: "blabla",
  //     creation_date: new Date()
  //   },
  //   {
  //     id: 2,
  //     type: "FOLLOW_USER",
  //     userid_from: 1,
  //     userid_to: 2,
  //     username_from: "u1",
  //     username_to: "u2",
  //     userAvatar_from: "https://media.istockphoto.com/id/1331335536/vector/female-avatar-icon.jpg?s=170667a&w=0&k=20&c=-iyD_53ZEeZPc4SmvmGB1FJXZcHy_fvbJBv6O8HblHs=",
  //     userAvatar_to: "path2",
  //     send_to_client_id: 1,
  //     send_to_client: "blabla",
  //     creation_date: new Date()
  //   },
  //   {
  //     id: 3,
  //     type: "COMMENT",
  //     userid_from: 1,
  //     userid_to: 2,
  //     username_from: "u1",
  //     username_to: "u2",
  //     userAvatar_from: "https://media.istockphoto.com/id/1331335536/vector/female-avatar-icon.jpg?s=170667a&w=0&k=20&c=-iyD_53ZEeZPc4SmvmGB1FJXZcHy_fvbJBv6O8HblHs=",
  //     userAvatar_to: "path2",
  //     send_to_client_id: 1,
  //     send_to_client: "blabla",
  //     creation_date: new Date()
  //   }
  // ]


  const renderMessageContent = (type, message) => {
    switch (type) {
      case 'LIKE_POST':
        return <LikeMessage message={message} />;
      case 'FOLLOW_USER':
        return <FollowMessage message={message} />;
      case 'COMMENT':
        return <CommentMessage message={message} />;
      case 'REPLY':
        return <ReplyMessage message={message} />;
      default:
        return;
    }
  };

  return (
    <DialogComponent isOpen={isOpen} onClose={onClose}>
      <FullWidthBox p={2}>
        <Stack spacing={2}>
          {messages.map((msg, index) => (
            <Paper key={index} elevation={2}>
              <Box p={2}>{renderMessageContent(msg.type, msg)}</Box>
            </Paper>
          ))}
        </Stack>
      </FullWidthBox>
    </DialogComponent>
  );
};

export default MessageStack

