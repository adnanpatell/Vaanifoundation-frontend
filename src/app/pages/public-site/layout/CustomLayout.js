import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItemText from "@mui/material/ListItemText";
import {Link as RouterLink, useLocation} from "react-router-dom";
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import logo from "assets/bharuch-health.png";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import Divider from '@mui/material/Divider';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Vaani Corporation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const navMenu = [
    {
        title:"Home",
        href:'/'        
    },
    {
        title:"About",
        href:'/about'        
    },
    {
        title:"Contact",
        href:'/contact'        
    },
]
const menuBefore = {
    left: 0,
    top: 0,
    content: `''`,
    position: 'absolute',
    display: 'inline-block',
    width: '4px',
    height: '100%',
    backgroundColor: 'transparent'
}
const drawerWidth = 240;
export default function CustomLayout(props) {
    const location = useLocation();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, m:0}}>
                <img style={{
                    maxHeight:55,
                    verticalAlign:'middle'
                }} src={logo} alt="Bharuch Health" />
            </Typography>
            <Divider />
            <List
                disablePadding
                sx={{
                    mr: 0,
                    pb: 2,
                    pl:1,
                    display: { xs: 'block', sm: 'flex' }
                }}
            >
                {
                    navMenu.map((ni, inx)=>{
                        return (
                            <ListItemButton 
                                component={"li"}
                                sx={{
                                    p: 0,
                                    overflow: 'hidden',
                                    borderRadius: '0 24px 24px 0',
                                    margin: '0',
                                    
                                    '&:hover': {
                                        color: (theme)=> theme.palette.primary.dark,
                                        // backgroundColor: theme => theme.palette.nav.background.hover,
                                        '&::before': {
                                            ...menuBefore,
                                            // backgroundColor: theme => theme.palette.nav.tick.hover,
                                        }
                                    },
                                    ...(location.pathname === ni.href) ? {
                                        color: (theme)=> theme.palette.primary.dark,
                                        // backgroundColor: theme => theme.palette.nav.background.active,
                                        '&::before': {
                                            ...menuBefore,
                                                //backgroundColor: theme => theme.palette.nav.tick.active,
                                        },
                                    } : {},
                                }}
                                key={`tmr-${inx}`}
                            >
                                <Link underline={"none"} variant="button" component={RouterLink} to={ni.href}
                                    sx={{
                                        flex: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        overflow: "hidden",
                                        position: "relative",
                                        color: 'inherit',
                                        
                                    }}
                                >  
                                        
                                    <ListItemText
                                        primary={ni.title}
                                        sx={{
                                            m: 0,
                                            '& .MuiTypography-root': {
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }
                                        }}
                                    />
                                    
                                </Link>
                            </ListItemButton>
                        )
                    })
                }
            
            </List>
        </Box>
    );
    
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>        
            <AppBar
                position="fixed"
                color="default"
                elevation={1}
                component="nav"
                sx={{ 
                    borderBottom: (theme) => `0px solid ${theme.palette.divider}`, 
                    backgroundColor:"#FFF" 
                }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, m:0, display: { xs: 'none', sm: 'block' } }}>
                        <img style={{
                            maxHeight:55,
                            verticalAlign:'middle'
                        }} src={logo} alt="" />
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <List
                            disablePadding
                            sx={{
                                mr: 2,
                                pb: 0,
                                display:'flex'
                            }}
                        >
                        {
                            navMenu.map((ni, inx)=>{
                                return (
                                    <ListItemButton 
                                        component={"li"}
                                        key={`tm-${inx}`}
                                        sx={{
                                            p: [0,0],
                                            overflow: 'hidden',
                                            borderRadius: '0 24px 24px 0',
                                            margin: '0',
                                            
                                            '&:hover': {
                                                color: (theme)=> theme.palette.primary.dark,
                                                // backgroundColor: theme => theme.palette.nav.background.hover,
                                                '&::before': {
                                                    ...menuBefore,
                                                    // backgroundColor: theme => theme.palette.nav.tick.hover,
                                                }
                                            },
                                            ...(location.pathname === ni.href) ? {
                                                color: (theme)=> theme.palette.primary.dark,
                                                // backgroundColor: theme => theme.palette.nav.background.active,
                                                '&::before': {
                                                    ...menuBefore,
                                                        //backgroundColor: theme => theme.palette.nav.tick.active,
                                                },
                                            } : {},
                                        }}
                                    >
                                        <Link underline={"none"} variant="button" component={RouterLink} to={ni.href}
                                            sx={{
                                                p: [0,1],
                                                flex: 1,
                                                display: "flex",
                                                alignItems: "center",
                                                overflow: "hidden",
                                                position: "relative",
                                                color: 'inherit',
                                                
                                            }}
                                        >  
                                                
                                            <ListItemText
                                                primary={ni.title}
                                                sx={{
                                                    m: 0,
                                                    fontWeight:'500',
                                                    '& .MuiTypography-root': {
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        fontWeight:'500',
                                                    }
                                                }}
                                            />
                                            
                                        </Link>
                                    </ListItemButton>
                                )
                            })
                        }
                        
                        </List>
                    </Box>
                    
                    <Box sx={{ flexGrow: 1 }} />
                    <Button 
                        size="medium" 
                        variant="contained"
                        sx={{
                            p: [0,0],
                        }}
                    >
                        <Link underline={"none"} component={RouterLink} to="/user/login" sx={{ color:"#FFF", p: [0,1] }}>
                            Login
                        </Link>
                    </Button>

                    
                
                </Toolbar>
                
            </AppBar>
            <Box component="nav">
                <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                >
                {drawer}
                </Drawer>
            </Box>
            
            {/* Hero unit */}
            <Container disableGutters maxWidth="" component="main" sx={{ 
                pt: 8, pb: 6, m:0, // backgroundColor:"#FFF" 
            }}>
                {props.children}
            </Container>
            {/* End hero unit */}
        
            {/* Footer */}
            <Container
                // maxWidth="lg"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 4,
                    py: [3, 3],
                }}
            >
                {/* <Grid container spacing={4} justifyContent="space-evenly">
                {footers.map((footer) => (
                    <Grid item xs={6} sm={3} key={footer.title}>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        {footer.title}
                    </Typography>
                    <ul>
                        {footer.description.map((item) => (
                        <li key={item}>
                            <Link href="#" variant="subtitle1" color="text.secondary">
                            {item}
                            </Link>
                        </li>
                        ))}
                    </ul>
                    </Grid>
                ))}
                </Grid> */}
                <Copyright sx={{ mt: 0 }} />
            </Container>
            {/* End footer */}
        </>
    );
}