import React, { useState } from 'react';
import { Grid, Typography, Button, Avatar, Card, CardHeader, CardContent, CardActions, Box, IconButton, colors } from '@mui/material';
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
    console.log(userList);
    return(
        <Card style={{ width: '50%', height: '500px', overflowY: 'auto', padding: '10px',position: 'fixed', top:'25%', left:'25%' }}>
            <div style={{ display: 'flex'}}>
                <IconButton onClick={handleBack}>
                <AiFillCloseCircle color='#ffffff'/>
            </IconButton>
            <Typography style={{ textAlign: 'center', padding: '5px', fontWeight: 'bold',color: '#ffffff', }}> {titleText}</Typography>
            </div>
            <br></br>
            {   userList[0]==='' ? <div></div> :
                <Grid container spacing={1} >
                {userList.map((userId) => (
                <Grid item xs={12} key={userId} style={{paddingTop:'0%'}} >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',padding: '10px'}}>
                        <div onClick={()=>handleUserVist(userId)}>
                            {userId === "" ? <div></div> : <UserUnit userId={userId}/>}
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