import { useState,useEffect } from "react";
import useLoggedInUser from "../../components/Helper/useLoggedInUser";
import { useNavigate,useParams } from 'react-router-dom'
import { Paper, Button, Typography, Avatar, Grid } from '@mui/material';
import { getOneUserInfo } from "../../services/user";
import MyPosts from "./MyPosts";
import { getAll, getPostsByUserID } from "../../services/post";
import { usePosts } from "../../components/Helper/usePosts";
import DialogComponent from "../../components/Wrapper/DialogComponent";
import FollowingCard from "./FollowingCard";
import { hover } from "@testing-library/user-event/dist/hover";
import { IoLocationOutline } from "react-icons/io5";


export default function Profile() {
    // 获取登陆用户信息，需要它的ID做事情
    const userID = useParams().visitedUserId;
    const [visitedUserInfo, setvisitedUserInfo] = useState(null);
    const [logginedUserInfo, setlogginedUserInfo] = useState(null);
    const [followingCard, setfollowingCard] = useState(false);
    const navigate = useNavigate();
    const logginedUser = useLoggedInUser();
    //console.log(logginedUser);

    // 根据ID拿用户信息
    useEffect(() => {
        const fetchData = async () => {
          const userInfo = await getOneUserInfo(userID);
          setvisitedUserInfo(userInfo);
        };
        fetchData();
      }, [userID]);

    
    if (!visitedUserInfo) {
    return (
        <pre>Loading...</pre>
    )
    }
    const followingsList = visitedUserInfo.followings.split(',');
    const fansList = visitedUserInfo.fans.split(',');

    function handleFollowingsList(){
        setfollowingCard(true);
    }

    return (
        <div style={{margin: '0', paddingTop: '7%' }}>
            <Paper style={{margin: '0', paddingTop: '1%',paddingBottom: '1%', backgroundColor: '#333333' }} >
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={1}>
                        <Avatar alt="User Avatar" src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62" style={{ width: '70px', height: '70px' }} />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h4" color={'#ffffff'}>{visitedUserInfo.username}</Typography>
                        <Typography variant="subtitle1" color={'#ffffff'}>{visitedUserInfo.email}</Typography>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
                <Grid container justify="center" alignItems="center" spacing={10} style={{paddingTop: '1%',paddingBottom: '0%' }}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={1}style={{}}>
                        <Typography onClick={() => handleFollowingsList()} fontSize={16} color={'#ffffff'} style={{paddingTop: '3%',paddingBottom: '0%', cursor:'pointer'}} >  Followings <br></br> {visitedUserInfo.followings.split(',').length} </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography onClick={() => handleFollowingsList()} fontSize={16} color={'#ffffff'} style={{paddingTop: '3%',paddingBottom: '0%', cursor:'pointer' }} >  Fans <br></br> <></>{visitedUserInfo.fans.split(',').length} </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography fontSize={16} color={'#ffffff'} style={{paddingTop: '3%',paddingBottom: '0%' }} >  Location <br></br> {visitedUserInfo.location}<IoLocationOutline></IoLocationOutline> </Typography>
                    </Grid>
                </Grid>
            </Paper>
        <Paper style={{backgroundColor: '#222222'}}>
            <MyPosts userid={visitedUserInfo.userID}/>
        </Paper>
        <DialogComponent
          isOpen={followingCard}
          children={<FollowingCard setfollowingCard = {setfollowingCard} fansList={fansList} followingsList={followingsList} logginedUser = {logginedUser}/>}
        />
        </div>
    );
}
