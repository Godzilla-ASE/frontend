import React, { useEffect, useState, useContext } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Stack, Paper, Box, styled } from '@mui/material';
import { FollowMessage, ReplyMessage, CommentMessage, LikeMessage } from './MessageType';
import DialogComponent from '../../components/Wrapper/DialogComponent';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import MessageContext from '../../context/MessageContext';


const FullWidthBox = styled(Box)(({ theme }) => ({
  width: '100%',
}));

const MessageStack = ({ isOpen, onClose }) => {
  const userId = useLoggedInUser()
  const [client, setClient] = useState(null);
  const { messages, setMessages } = useContext(MessageContext);

  useEffect(() => {
    // 创建并激活 STOMP 客户端
    const newClient = new Client({
      webSocketFactory: () => new SockJS('http://172.20.10.3:10000/ase-websocket'),
      onConnect: () => {
        console.log('Connected');

        // 订阅消息监听接口
        newClient.subscribe(`/topic/post/${userId}`, (message) => {
          console.log('message sent', message)
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
          {/* The messages initiated by the user are dispatched as "null" through the backend. */}
          {messages.map((msg, index) => (
            msg ? <Paper key={index} elevation={2}>
              <Box p={2}>{renderMessageContent(msg.type, msg)}</Box>
            </Paper> : null
          ))}
        </Stack>
      </FullWidthBox>
    </DialogComponent>
  );
};

export default MessageStack
