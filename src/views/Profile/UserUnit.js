import { Avatar, Box, Typography } from '@mui/material';
import { getOneUserInfo } from '../../services/user';
import { useEffect, useState } from 'react';

const UserUnit = ({ userId }) => {
    const [userInfo, setUserInfo] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const userInfo = await getOneUserInfo(userId);
        setUserInfo(userInfo);
      };
      fetchData();
    }, []);
  
  
    if (!userInfo) {
      return (
        <pre>Loading...</pre>
      )
    }

    const styles = {
        container: {
          display: 'flex',
          alignItems: 'center'
        },
        avatar: {
          width: '50px',
          height: '50px',
          marginRight: '10px'
        },
        name: {
          fontSize: '16px',
          fontWeight: 'bold'
        },
        email: {
          fontSize: '14px'
        },
        location: {
          fontSize: '12px'
        }
      };

    return(
        <div style={styles.container}>
      <Avatar alt="Profile picture" src={userInfo.avatarUrl} style={styles.avatar} />
      <div>
        <Typography variant="h6" style={styles.name}>
          {userInfo.username}
        </Typography>
        <Typography variant="subtitle1" style={styles.email}>
          {userInfo.email}
        </Typography>
        <Typography variant="subtitle2" style={styles.location}>
          {userInfo.location}
        </Typography>
      </div>
    </div>
    );
}

export default UserUnit;