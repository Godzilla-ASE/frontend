import React from "react";
import { CardHeader, CardContent, Avatar, Typography } from '@mui/material';

function Replys({ replys }) {

    return(
        <div>
            <CardHeader avatar={<Avatar src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62" />} title={"username"} style={{paddingTop: '5%', paddingBottom: '0'}}/>
                <CardContent style={{marginLeft:'10%'}}>
                You are right, but there may be something wrong with your words. You are right, but there may be something wrong with your words. <br></br><br></br>
                <Typography color={'#bbbbbb'} fontSize={'12px'}>
                    2021-12-1 Zurich
                </Typography>
                </CardContent>
        </div>
    )

}

export default Replys;