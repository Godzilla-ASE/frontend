import React, { useState } from 'react';
import { Grid, Typography, Button, Avatar, Card, CardHeader, CardContent, CardActions, Box, IconButton } from '@mui/material';
import FollowWrapper from '../../components/Wrapper/FollowWrapper';
import UserInfoWrapper from '../../components/Wrapper/UserInfoWrapper';
import { useNavigate } from 'react-router-dom';
import UserUnit from './UserUnit';
import { AiFillCloseCircle } from 'react-icons/ai';

const UserList = ({ titleText, setCardOpen, userList, logginedUser }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        setCardOpen(false);
      };
    
    const handleUserVist = (userId) => {
        navigate(`/profile/${userId}`)
    };

    return(
        <Card style={{ width: '20%', height: '500px', overflowY: 'auto', padding: '10px',position: 'fixed', top:'25%', left:'40%' }}>
            <IconButton onClick={handleBack}>
                <AiFillCloseCircle/>
            </IconButton>
            <h3 style={{ textAlign: 'center' }}>{titleText}</h3>
            <br></br>
            {
                userList[0]==='' ? <div></div> :
                <Grid container spacing={1} style={{ marginTop: '0px' }}>
                {userList.map((userId) => (
                <Grid item xs={12} key={userId} style={{paddingTop:'3%'}} >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',padding: '10px',border: '1px solid #ccc',borderRadius: '5px'}}>
                        <div onClick={()=>handleUserVist(userId)}>
                            <UserUnit userId={userId}/>
                        </div>
                        <FollowWrapper loginUser={logginedUser} userID={userId}/>
                    </div>
                </Grid>
                ))}
            </Grid> 
            }
            


        </Card>
    )

}

export default UserList;