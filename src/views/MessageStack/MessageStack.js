import React, { useEffect, useState, useContext } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Stack, Paper, Box, styled, Typography } from '@mui/material';
import { FollowMessage, ReplyMessage, CommentMessage, LikeMessage } from './MessageType';
import DialogComponent from '../../components/Wrapper/DialogComponent';
import useLoggedInUser from '../../Hooks/useLoggedInUser';
import { MessageContext } from '../../context/MessageContext';
import { useHistoryMessages } from '../../Hooks/useHistoryMessages';


const FullWidthBox = styled(Box)(({ theme }) => ({
  width: '100%',
}));

const MessageStack = ({ isOpen, onClose, setNewMessage }) => {
  const user = useLoggedInUser()
  useHistoryMessages(user)
  const id = user.id

  const { state, dispatch } = useContext(MessageContext)
  const [client, setClient] = useState(null);

  useEffect(() => {
    // create and activate stomp
    const newClient = new Client({
      webSocketFactory: () => new SockJS('http://notify:8083/ase-websocket'),
      onConnect: () => {
        console.log('Connected');

        // subscribe to the messages channel
        newClient.subscribe(`/topic/post/${id}`, (data) => {
          const newMessage = JSON.parse(data.body);
          console.log('newMessage', newMessage)
          dispatch({ type: "NEW_MESSAGE", newMessage })
          setNewMessage(true)
        });
      },
    });

    setClient(newClient);
    newClient.activate();

    // close the stomp
    return () => newClient.deactivate();
  }, []);

  const renderMessageContent = (type, message) => {
    switch (type) {
      case 'LIKE_POST':
        return <LikeMessage message={message} handleMessageDialog={onClose} />;
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
        <Typography variant="h2" className="signup-heading" sx={{ color: 'primary.main' }}>
          Messages
        </Typography>
        <Stack spacing={2}>
          {/* The messages initiated by the user are dispatched as "null" through the backend. */}
          {state.messages && state.messages.slice().reverse().slice(0, 5).map((msg, index) => (
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
