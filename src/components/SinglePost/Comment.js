import React from "react";
import { Card, CardHeader, CardContent, Avatar, Grid, Typography } from '@mui/material';
import Reply from "./Reply";

function Comment({ comment }) {
    console.log(comment);

    const content = comment.content;
    const date = comment.creation_date;
    const replys = comment.reply;
    const username = comment.username;

    if (replys.length !== 0){
        return (
            <div>
                <div style={{borderTop:'1px solid #ccc', width:'70%', marginLeft:"15%"}}></div>
                <CardHeader avatar={<Avatar src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62" />} title={username} style={{paddingTop: '5%', paddingBottom: '0'}}/>
                    <CardContent style={{marginLeft:'10%'}}>
                    {content}<br></br><br></br>
                    <Typography color={'#bbbbbb'} fontSize={'12px'}>
                        {date} Zurich
                    </Typography>
                    <div>
                        {replys.map((reply) => (
                            <Reply reply={reply} />
                        ))}
                    </div>
                    </CardContent>
            </div>
          );
    }
    else{
        return(
            <div>
              <div style={{borderTop:'1px solid #ccc', width:'70%', marginLeft:"15%"}}></div>
              <CardHeader avatar={<Avatar src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62" />} title={username} style={{paddingTop: '5%', paddingBottom: '0'}}/>
                  <CardContent style={{marginLeft:'10%'}}>
                  {content} <br></br><br></br>
                  <Typography color={'#bbbbbb'} fontSize={'12px'}>
                      {date} Zurich
                  </Typography>

                  </CardContent>
          </div>
        );
    }
  
}

export default Comment;