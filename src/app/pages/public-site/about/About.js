import Div from '@jumbo/shared/Div/Div'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import imageClintek from 'assets/images/clinitek.webp';

const About = () => {
    return (
      <Box sx={{p:2}}>
        <Grid container spacing={3} sx={{mt:1}}>
          <Grid item xs={12} sm={6}>
            <Typography variant='body1'>
              <h1>Contrary to popular belief, Lorem Ipsum is not simply random text.</h1>
            </Typography>
            <Typography variant='p'>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Div>
              <img 
                style={{maxWidth:'100%'}}
                src={imageClintek}
              />
            </Div>
            
          </Grid>
        </Grid>
      </Box>
    )
}

export default About
