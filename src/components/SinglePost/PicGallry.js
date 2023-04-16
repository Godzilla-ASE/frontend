import React, { useState } from 'react';
import { CardMedia, Typography } from '@mui/material';
import './singlepost.css';
import {  AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

export default function PicGallry({images}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const picNum = images.length;

    const handlePrev = () => {
        setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
      };
    
    const handleNext = () => {
      setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    };
  
    const handleMouseEnter = () => {
      document.getElementById('leftBtn').style.display = 'block';
      document.getElementById('rightBtn').style.display = 'block';
      document.getElementById('picIndex').style.display = 'block';
    };
  
    const handleMouseLeave = () => {
      document.getElementById('leftBtn').style.display = 'none';
      document.getElementById('rightBtn').style.display = 'none';
      document.getElementById('picIndex').style.display = 'none';
    };

    return(
        <div className="scrollable-container-photo" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ position: 'relative' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '550px' }}>
                <CardMedia component="img" image={images[currentIndex]} alt="post image" style={{ top: '1%' }} />
            </div> 
            <Typography id="picIndex" variant="contained" style={{ position: 'absolute', top: '5%', right: '3%', zIndex: 1, display: 'none', color: 'white', backgroundColor: "#585858", padding: "3px 4px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", borderRadius: '10px' }}>
                {currentIndex + 1}/{picNum}
            </Typography>
            <div id="leftBtn" onClick={handlePrev} style={{ position: 'absolute', top: '50%', left: '1%', zIndex: 1, display: 'none' }}>
                {<AiFillLeftCircle className="leftBottom" color="#dddddd" size={35} />}
            </div>
            <div id="rightBtn" onClick={handleNext} style={{ position: 'absolute', top: '50%', right: '1%', zIndex: 1, display: 'none' }}>
                {<AiFillRightCircle className="rightBottom" color="#dddddd" size={35} />}
            </div>
      </div>
    )
}