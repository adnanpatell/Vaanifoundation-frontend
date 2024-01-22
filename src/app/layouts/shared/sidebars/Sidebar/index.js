import React, {Suspense, useEffect, useLayoutEffect, useState} from 'react';
import {IconButton} from "@mui/material";
import menus from "./menus";
import JumboVerticalNavbar from "@jumbo/components/JumboVerticalNavbar/JumboVerticalNavbar";
import {DrawerHeader} from "@jumbo/components/JumboLayout/style";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import useJumboSidebarTheme from "@jumbo/hooks/useJumboSidebarTheme";
import {SIDEBAR_STYLES, SIDEBAR_VIEWS} from "@jumbo/utils/constants/layout";
import Logo from "../../../../shared/Logo";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Zoom from "@mui/material/Zoom";
import Div from "@jumbo/shared/Div";
import SidebarSkeleton from "./SidebarSkeleton";
import { useDispatch, useSelector } from 'react-redux';
import useJumboAuth from '@jumbo/hooks/useJumboAuth';

const Sidebar = (props) => {
    const dispatch = useDispatch();
    const {authUser} = useJumboAuth();
    const roleDataStore = useSelector((state)=> state?.user?.AUTH_ACCESS || {});
    const [roleData, setRoleData] = useState(roleDataStore);
    const [items, setItems] = useState([]);
    useEffect(() => {
        // console.log(authUser, "authUser")
        setItems(props.items);
        handleMenus()
    }, [roleData])
    

    const handleMenus = () => {
        if(roleData && roleData.access){
            let itemsData = menus.map((it)=> {
                if(it.children && it.children.length > 0){
        
                    it.children = it.children.filter((ch)=>{
                        if(ch.type === "nav-item" && ch.access){
                            let keys = ch.access.split(".");
                            let checkAccess = roleData?.access?.[keys[0]]?.[keys[1]];
                            if(checkAccess) return true;
                            return false;
                        }else if(ch.type === "collapsible"){
                            ch.children = ch.children.filter((cch)=>{
                                if(cch.type === "nav-item" && cch.access){
                                    let keys = cch.access?.split(".");
                                    let checkAccess = roleData?.access?.[keys[0]]?.[keys[1]];
                                    if(checkAccess) return true;
                                    return false;
                                }else{
                                    return true;
                                }
                                                   
                            });
                        }
                        return true;
                    });
        
                    
                }else {
                    console.log(it, "it Single");
                }
                return it;
            });
    
            setItems(itemsData);
        }else{
            setItems([]);
        }
        
    }

    return (
        <React.Fragment>
            <SidebarHeader/>
            <JumboScrollbar
                autoHide
                autoHideDuration={200}
                autoHideTimeout={500}
            >
                <Suspense
                    fallback={
                        <Div
                            sx={{
                                display: 'flex',
                                minWidth: 0,
                                alignItems: 'center',
                                alignContent: 'center',
                                px: 3
                            }}
                        >
                            <SidebarSkeleton/>
                        </Div>
                    }
                >
                    
                    <JumboVerticalNavbar translate items={items}/>
                    
                    
                </Suspense>
            </JumboScrollbar>
        </React.Fragment>
    );
};

const SidebarHeader = () => {
    const {sidebarOptions, setSidebarOptions} = useJumboLayoutSidebar();
    const {sidebarTheme} = useJumboSidebarTheme();

    const isMiniAndClosed = React.useMemo(() => {
        return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
    }, [sidebarOptions.view, sidebarOptions.open]);


    return (
        <React.Fragment>
            {
                sidebarOptions?.style !== SIDEBAR_STYLES.CLIPPED_UNDER_HEADER &&
                <DrawerHeader>
                    <Logo mini={isMiniAndClosed} mode={sidebarTheme.type}/>
                    {
                        sidebarOptions?.view !== SIDEBAR_VIEWS.MINI &&
                        <Zoom in={sidebarOptions?.open}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ml: 0, mr: -1.5}}
                                onClick={() => setSidebarOptions({open: false})}
                            >
                                <MenuOpenIcon/>
                            </IconButton>
                        </Zoom>
                    }
                </DrawerHeader>
            }
        </React.Fragment>
    )
};

export default Sidebar;
