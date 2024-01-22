// import Swiper core and required modules
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/effect-creative';

import "./swiper.css";

// import required modules
import { Navigation } from "swiper";
import img1 from 'assets/images/1.webp';
import img2 from 'assets/images/2.webp';
import img3 from 'assets/images/3.webp';
import img4 from 'assets/images/4.webp';
import Div from "@jumbo/shared/Div/Div";
import { Grid, Typography } from "@mui/material";
import { EffectCreative } from 'swiper/modules';

const ImageSlider = () => {
  const imageSlider = [
    {
      img:img1,
      head:'Digital health care system that provide seamless experience.',
      headText:'One of the key components of a Digital Health Care System is the adoption of EHRs, which replace traditional paper-based medical records.'
    },
    {
      img:img2,
      head:"Digital Health Care System",
      headText:"EHRs allow healthcare providers to access patient information instantly, facilitating more accurate diagnoses and personalized treatment plans"
    },
    { 
      img:img3,
      head:"Digital Health Care System",
      headText:"Digital Health Care System revolutionizes healthcare delivery by leveraging technology to improve patient care, enhance operational efficiency, and empower individuals to take control of their health"
    },
    { 
      img:img4,
      head:"Digital Health Care System",
      headText:"Digital Health Care System revolutionizes healthcare delivery by leveraging technology to improve patient care, enhance operational efficiency, and empower individuals to take control of their health"
    }
  ]
  return (
    <Swiper navigation={true} 
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }}
      modules={[EffectCreative]} 
      effect="creative" 
      className="mySwiper"
    >
      {
        imageSlider.map((imageData, imgIndex) => {
          return (
            <SwiperSlide key={`img-${imgIndex}`}>
              <Grid container alignItems={`center`} spacing={1}>
                <Grid item xs={12} sm={6} md={6}>
                  <Div
                    sx={{
                      alignItems:'center',
                      padding:'0px 10px',
                    }}
                  >
                    <Typography variant="h1" sx={{color:'#0e3779', fontSize:'50px', fontWeight:'700', textAlign:'start', mt:1}}>
                      {imageData?.head}
                    </Typography>
                    <Typography sx={{color:'#f17e01', textAlign:'start', fontWeight:'500', fontSize:'18px'}}>{imageData.headText}</Typography>
                  </Div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <img style={{ maxWidth: "100%" }} src={imageData.img} />
                </Grid>
              </Grid>
              
              
              
              {/* <Div sx={{
                position:'absolute',
                width:'80%',
                bottom:'10%',
                padding:'10px 20px',
                backgroundColor:'#20202052',
              }}>
                <Typography variant="h1" sx={{color:'#FFF', fontWeight:'600', mt:1}}>
                  {imageData.title}
                </Typography>
                <Typography sx={{color:'#FFF', fontWeight:'500', fontSize:'15px'}}>{imageData.text}</Typography>
              </Div> */}
              
            </SwiperSlide>
          )
        })
      }

    </Swiper>
  );
};

export default ImageSlider;