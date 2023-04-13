import React from "react";
import { Card, CardHeader, CardContent, Avatar, Grid, Typography } from '@mui/material';
import Replys from "./Replys";

function Comment({ comment }) {
    console.log(comment);

    // 暂时用GetAll得到的数据做测试，因为还没有测试数据。假装postTitle就是内容，reply也先写死了
    const content = comment.title;
    const date = comment.creation_date;
    const replys = comment.reply;

    if (!replys){
        return (
            <div>
                <div style={{borderTop:'1px solid #ccc', width:'70%', marginLeft:"15%"}}></div>
                <CardHeader avatar={<Avatar src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62" />} title={"username"} style={{paddingTop: '5%', paddingBottom: '0'}}/>
                    <CardContent style={{marginLeft:'10%'}}>
                    {content}!!!<br></br><br></br>
                    <Typography color={'#bbbbbb'} fontSize={'12px'}>
                        {date} Zurich
                    </Typography>
                        <Replys/>
                    </CardContent>
            </div>
          );
    }
    else{
        return(
            <div>
              <div style={{borderTop:'1px solid #ccc', width:'70%', marginLeft:"15%"}}></div>
              <CardHeader avatar={<Avatar src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62" />} title={"username"} style={{paddingTop: '5%', paddingBottom: '0'}}/>
                  <CardContent style={{marginLeft:'10%'}}>
                  {content}!!! <br></br><br></br>
                  <Typography color={'#bbbbbb'} fontSize={'12px'}>
                      {date} Zurich
                  </Typography>

                  </CardContent>
          </div>
        );
    }
  
}

export default Comment;