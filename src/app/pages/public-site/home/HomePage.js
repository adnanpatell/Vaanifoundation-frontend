import React from 'react'
import Div from '@jumbo/shared/Div/Div'
import { Box, Grid, Typography } from '@mui/material'
import imageHome1 from 'assets/images/health-home.jpg';
import imageAppointments from 'assets/images/appointments.png';
import imageLab from 'assets/images/lab.png';
import imageReceptioniest from 'assets/images/receptioniest.png';
import ImageSlider from './ImageSlider';

const Home = () => {
  return (
    <>
      
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ImageSlider />
          </Grid>
        </Grid>
        <Grid container alignItems={'center'} spacing={3} sx={{py:2, px:{xs:1,sm:10}, mb:14, mt:3}}>
          
          <Grid item xs={12} sm={6}>
            <Typography sx={{color: (theme)=> theme.palette.primary.dark, fontWeight:500}} variant='h1'>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
            </Typography>
            <Typography variant='p' sx={{fontWeight:500}}>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Div sx={{display:'flex', justifyContent:'right'}}>
              <img 
                style={{maxWidth:'100%'}}
                src={imageHome1}
                alt='About Vaani'
              />
            </Div>
            
          </Grid>
        </Grid>
        
      </Box>

      
      <Box sx={{p:2, px:{xs:1,sm:10}, mb:14}}>
        <Grid container alignItems={'center'} spacing={3}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h1' sx={{color: (theme)=> theme.palette.primary.dark, fontWeight:'bold' }} textAlign={'center'}>
              Doctor Dashboard
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{pt:0}}>
            <Div>
              <img 
                style={{maxWidth:'100%'}}
                src={imageAppointments}
                alt='About Vaani'
              />
            </Div>
          </Grid>
          <Grid item xs={12} sm={6} sx={{pt:0}}>
            <Typography sx={{color: (theme)=> theme.palette.primary.dark, fontWeight:500}} variant='h1'>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
            </Typography>
            <Typography variant='p' sx={{fontWeight:500}}>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </Typography>
          </Grid>
        </Grid>
      </Box>


      <Box sx={{p:2, px:{xs:1,sm:10}, mb:14}}>
        <Grid container alignItems={'center'} spacing={3}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h1' sx={{color: (theme)=> theme.palette.primary.dark, fontWeight:'bold' }} textAlign={'center'}>
              Pharmasists Dashboard
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={5} sx={{pt:0}}>
            <Typography sx={{color: (theme)=> theme.palette.primary.dark, fontWeight:500}} variant='h1'>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
            </Typography>
            <Typography variant='p' sx={{fontWeight:500}}>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics
            </Typography>
          </Grid>
          <Grid item xs={12} sm={7} sx={{pt:0}}>
            <Div>
              <img 
                style={{maxWidth:'100%'}}
                src={imageAppointments}
                alt='About Vaani'
              />
            </Div>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{p:2, px:{xs:1,sm:10}, mb:14}}>
        <Grid container alignItems={'center'} spacing={3}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h1' sx={{color: (theme)=> theme.palette.primary.dark, fontWeight:'bold' }} textAlign={'center'}>
              Laboratory Dashboard
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{pt:0}}>
            <Div>
              <img 
                style={{maxWidth:'100%'}}
                src={imageLab}
                alt='About Vaani'
              />
            </Div>
          </Grid>
          <Grid item xs={12} sm={6} sx={{pt:0}}>
            <Typography sx={{color: (theme)=> theme.palette.primary.dark, fontWeight:500}} variant='h1'>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
            </Typography>
            <Typography variant='p' sx={{fontWeight:500}}>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{py:2, px:{xs:1,sm:10}}}>
        <Grid container alignItems={'center'} spacing={3}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h1' sx={{color: (theme)=> theme.palette.primary.dark, fontWeight:'bold' }} textAlign={'center'}>
              Receptionist Dashboard
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={5} sx={{pt:0}}>
            <Typography sx={{color: (theme)=> theme.palette.primary.dark, fontWeight:500}} variant='h1'>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
            </Typography>
            <Typography variant='p' sx={{fontWeight:500}}>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics
            </Typography>
          </Grid>
          <Grid item xs={12} sm={7} sx={{pt:0}}>
            <Div>
              <img 
                style={{maxWidth:'100%'}}
                src={imageReceptioniest}
                alt='About Vaani'
              />
            </Div>
          </Grid>
        </Grid>
      </Box>
    </>
      
  )
}

export default Home
