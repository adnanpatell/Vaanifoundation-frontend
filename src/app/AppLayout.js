import React, { useEffect, useContext } from 'react';
import JumboLayoutProvider from "@jumbo/components/JumboLayout/JumboLayoutProvider";
import JumboContentLayoutProvider from "@jumbo/components/JumboContentLayout/JumboContentLayoutProvider";
import useJumboApp from "@jumbo/hooks/useJumboApp";
import {LAYOUTS} from "./utils/constants/layouts";
import {config} from "./config/main";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';
import {AuthContext} from "@jumbo/components/JumboAuthProvider/JumboAuthContext";

const AppLayout = (props) => {
    const authDataContext = useContext(AuthContext);
    const {activeLayout, activeTopNav} = useJumboApp();
    
    const {isLoading} = useJumboAuth();
    const dispatch = useDispatch();
    const roleDataStore = useSelector((state)=> state?.user?.AUTH_ACCESS || {});

    if (!activeLayout) {
        throw Error("AppLayout > No activeLayout is set.");
    }

    useEffect(()=>{
        
        if((
            typeof props.socket != "undefined" && 
            typeof authDataContext != "undefined" && 
            typeof authDataContext.authUser != "undefined" && 
            authDataContext.authUser != null && 
            typeof authDataContext.authUser._id != "undefined" && 
            typeof authDataContext.authUser.phcid != "undefined")
        ){
            /* props.socket.on('connect', function(){
                console.log("Socket Connected 1", authDataContext)
                var params = {
                    room: authDataContext.authUser.phcid,
                    name: authDataContext.authUser._id
                }
                props.socket.emit('join', params, function(){
                    console.log('User has joined this channel');
                });
            }); */
            var params = {
                room: authDataContext.authUser.phcid,
                name: authDataContext.authUser._id
            }
            props.socket.emit('join', params, function(){
                console.log('User has joined this channel');
            });
        }
        
    },[dispatch, props.socket, authDataContext, authDataContext.authUser]);

    
    const LayoutComponent = React.useMemo(() => {
        const layoutIndex = LAYOUTS.findIndex(layout => layout.name === activeLayout);
        
        if (layoutIndex >= 0) {
            return LAYOUTS[layoutIndex].component;
        }

        throw Error("No activeLayout is set yet.");
    }, [activeLayout]);

    return (
        <JumboLayoutProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            {
                isLoading
                    ?
                    <div className="loader">
                        <svg className="circular-loader" viewBox="25 25 50 50">
                            <circle className="loader-path" cx="50" cy="50" r="20" />
                        </svg>
                    </div>
                    :
                    <LayoutComponent activeTopNav={activeTopNav} socket={props.socket} roleDataStore={roleDataStore}>
                        <JumboContentLayoutProvider
                            layoutOptions={config.defaultContentLayout}
                        >
                            {props.children}
                        </JumboContentLayoutProvider>
                    </LayoutComponent>
            }
            </LocalizationProvider>
        </JumboLayoutProvider>
    );
};

export default AppLayout;
