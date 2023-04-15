import React from "react";
import { CardHeader, CardContent, Avatar, Typography } from '@mui/material';

function Replys({ reply }) {
    const content = reply.content;
    const date = reply.creation_date;
    const username_from = reply.username_from;


    return(
        <div>
            <CardHeader avatar={<Avatar src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62" />} title={username_from} style={{paddingTop: '3%', paddingBottom: '0'}}/>
                <CardContent style={{marginLeft:'12%'}}>
                    {content}<br></br><br></br>
                <Typography color={'#bbbbbb'} fontSize={'12px'}>
                    {date} Zurich
                </Typography>
                </CardContent>
        </div>
    )

}

export default Replys;