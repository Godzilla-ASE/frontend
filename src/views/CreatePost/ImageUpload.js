import React, { useState } from 'react';
import { Grid, Box, Button, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';

const ImageGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
}));

const ImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(1),
}));

const ImageUpload = ({ images, handleImageDelete, handleImageUpload }) => {

  return (
    <Grid container className={ImageGrid} sx={{ height: '100%' }}>
      {Array.from({ length: 9 }).map((_, index) => (
        <Grid item xs={4} key={index}>
          <Box
            className={ImageBox}
            sx={{
              width: '100%',
              height: 0,
              paddingBottom: '100%',
              position: 'relative',
            }}
          >
            <label htmlFor={`image-upload-${index}`}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id={`image-upload-${index}`}
                type="file"
                onChange={(e) => handleImageUpload(e, index)}
                disabled={images[index]}
              />
              {images[index]
                ? (
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      alt=""
                      src={images[index]}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute', // 使用绝对定位
                        top: 0,
                        left: 0,
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        padding: 1, // 您可以根据需要调整按钮的内边距
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={
                          <CloseIcon
                            style={{
                              verticalAlign: 'middle',
                              fontSize: '16px',
                              marginRight: 0, // 添加这一行，设置右边距为0
                            }}
                          />
                        }
                        onClick={(event) => handleImageDelete(event, index)}
                        style={{ padding: '6px 8px', minWidth: 'auto' }}
                      />
                    </Box>
                    {/* <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={progress[index]}
                        color="success"
                        style={{ display: progress[index] === 100 ? 'none' : 'block' }}
                      />
                    </Box> */}
                  </Box>
                )
                : index <= images.filter(Boolean).length ? (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute', // 使用绝对定位
                      top: 0,
                      left: 0,
                      display: 'flex',
                      alignItems: 'center', // 垂直居中
                      justifyContent: 'center', // 水平居中
                      cursor: 'pointer',
                    }}
                  >
                    <AddAPhotoIcon
                      sx={{
                        fontSize: 20, // 设置大小
                        color: 'secondary.main', // 设置颜色为主题的主要颜色
                      }}
                    />
                  </Box>
                ) : null}
            </label>
          </Box>
        </Grid>
      ))}
    </Grid>
  )

}

export default ImageUpload