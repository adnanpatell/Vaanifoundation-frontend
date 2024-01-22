import React from 'react';
import {Card, CardContent, TextField, Typography} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Div from "@jumbo/shared/Div";
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";


const ContactUs = () => {
    const {t} = useTranslation();
    return (
        <React.Fragment>
            <Typography variant="h1" mb={3}>Update Profile</Typography>
            <Card sx={{display: 'flex', mb: 3.5}}>
                <Div sx={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                    <CardContent>
                        <Typography variant="h6" color={"text.secondary"}>Update Profile</Typography>
                        <Typography component={"h2"} variant="h1" mb={3}>Manage your profile</Typography>
                        <Box component="form"
                             sx={{
                                 mx: -1,

                                 '& .MuiFormControl-root:not(.MuiTextField-root)': {
                                     p: 1,
                                     mb: 2,
                                     width: {xs: '100%', sm: '50%'}
                                 },

                                 '& .MuiFormControl-root.MuiFormControl-fluid': {
                                     width: '100%'
                                 }
                             }}
                             autoComplete="off"
                        >
                            <FormControl>
                                <TextField
                                    fullWidth
                                    id="firstname"
                                    label="Enter Name"
                                    defaultValue=""
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    fullWidth
                                    id="lastname"
                                    label="Last Name"
                                    defaultValue=""
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    defaultValue=""
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    fullWidth
                                    id="phoneno"
                                    label="Phone No."
                                    defaultValue=""
                                />
                            </FormControl>
                            
                            <Div sx={{mx: 1}}>
                                <Button variant={"contained"}>Submit</Button>
                            </Div>
                        </Box>
                    </CardContent>
                </Div>
            </Card>
        </React.Fragment>
    );
};

export default ContactUs;
