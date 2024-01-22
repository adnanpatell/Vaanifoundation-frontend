import React from 'react';
import Avatar from "@mui/material/Avatar";
import {authUser} from "./fake-db";
import {ListItemIcon, ListItemText, ThemeProvider, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import Div from "@jumbo/shared/Div";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_ACCESS } from 'app/utils/constants/user';

const AuthUserDropdown = () => {
    const navigate = useNavigate();
    const {theme} = useJumboTheme();
    const authCtx = useJumboAuth();
    const dispatch = useDispatch();
    const onLogout = () => {
        
        authCtx.setAuthToken(null);
        authCtx.setAuthData({})
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        dispatch({ type: AUTH_ACCESS, payload: {} });
        // navigate("/user/login");
        setTimeout(()=>{
            window.location.href = "/user/login"
        }, 300)
    };

    const editProfileLink = () => {
        if(authCtx?.authUser?._id){
            navigate(`/user/profile`);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <JumboDdPopover
                triggerButton={
                    <Avatar
                        src={authCtx.authUser?.profile}
                        sizes={"small"}
                        sx={{boxShadow: 25, cursor: 'pointer'}}
                    />
                }
            >
                <Div sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: theme => theme.spacing(2.5),
                }}>
                    <Avatar src={authCtx.authUser?.profile} alt={authCtx.authUser?.first_name} sx={{width: 60, height: 60, mb: 2}}/>
                    <Typography variant={"h5"}>{authCtx.authUser?.first_name} {authCtx.authUser?.middle_name} {authCtx.authUser?.last_name}</Typography>
                    <Typography variant={"body1"} color="text.secondary" sx={{mb: 1}}>{authCtx.authUser?.email}</Typography>
                    <Typography variant={"body1"} color="text.secondary">{authCtx.authUser?.roleData?.name}</Typography>
                </Div>
                <Divider/>
                <nav>
                    <List disablePadding sx={{pb: 1}}>
                        {/* <ListItemButton>
                            <ListItemIcon sx={{minWidth: 36}}>
                                <PersonOutlineIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Profile" sx={{my: 0}}/>
                        </ListItemButton> */}
                        <ListItemButton
                            onClick={editProfileLink}
                        >
                            <ListItemIcon sx={{minWidth: 36}}>
                                <EditOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Edit Profile" sx={{my: 0}}/>
                        </ListItemButton>
                        {/* <ListItemButton>
                            <ListItemIcon sx={{minWidth: 36}}>
                                <RepeatOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText onClick={() => navigate("/samples/content-layout")} primary="Switch User"
                                          sx={{my: 0}}/>
                        </ListItemButton> */}
                        <ListItemButton onClick={onLogout}>
                            <ListItemIcon sx={{minWidth: 36}}>
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{my: 0}}/>
                        </ListItemButton>
                    </List>
                </nav>
            </JumboDdPopover>
        </ThemeProvider>
    );
};

export default AuthUserDropdown;
