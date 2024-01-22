import React, { useState } from 'react'
import { Avatar, Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material'
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };
  return (
    <Box sx={{py:2, px:{xs:1,sm:10}, mb:0}}>
      
        
      <Grid container alignItems={'center'} spacing={3} sx={{mt:1}}>
        <Grid item xs={12} sx={{pt:{xs:0}}} style={{paddingTop:0}}>
          <Typography variant='h1' sx={{color: (theme)=> theme.palette.primary.dark }} textAlign={'center'}>
              Contact Form
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} >
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              type="email"
            />
            <TextField
              fullWidth
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              margin="normal"
              required
              multiline
              rows={4}
            />
            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} sm={6}>
          

          <List
              sx={{
                  width: '100%',
                  // maxWidth: 360,
                  mb: 2,
                  
              }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <IconButton>
                    <CallIcon />
                  </IconButton>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Contact Number" secondary="+91 88666 85088"/>
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Email" secondary="vaanicorporation88@gmail.com"/>
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <IconButton>
                    <BusinessIcon />
                  </IconButton>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Address" secondary="Vaani Foundation, Shop No. 201, 2nd Floor, Dant Krupa society. Bharuch"/>
            </ListItem>
            <Divider variant="inset" component="li"/>
            
          </List>
          


        </Grid>
      </Grid>
    </Box>
  )
}

export default Contact


