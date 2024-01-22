import React, { useContext, useEffect } from 'react';
import JumboNavIdentifier from "@jumbo/components/JumboVerticalNavbar/JumboNavIdentifier";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import {SIDEBAR_VIEWS} from "@jumbo/utils/constants/layout";
import List from "@mui/material/List";
import PropTypes from 'prop-types';

const JumboVerticalNavbar = ({items}) => {
    // const roleData = localStorage.getItem("access_token") ? JSON.parse(localStorage.getItem("access_token")) : {};
    /* useEffect(()=>{
        
    },[roleData]) */

    /* items = items.map((it)=> {
        if(it.children && it.children.length > 0){

            it.children = it.children.filter((ch)=>{
                // console.log(ch, "it it it", authDataContext.authUser?.roleData?.access?.['user.view_user'], "authDataContext")
                if(ch.type === "nav-item" && ch.access){
                    let keys = ch.access.split(".");
                    let checkAccess = roleData?.access?.[keys[0]]?.[keys[1]];
                    console.log(checkAccess, "checkAccess", ch)
                    if(checkAccess) return true;
                    return false;
                }else if(ch.type === "collapsible"){
                    ch.children = ch.children.filter((cch)=>{
                        if(cch.type === "nav-item" && cch.access){
                            let keys = cch.access?.split(".");
                            let checkAccess = roleData?.access?.[keys[0]]?.[keys[1]];
                            console.log(cch, "cch cch cch checkAccess", keys, checkAccess)
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
    }); */

    const {sidebarOptions} = useJumboLayoutSidebar();
    
    const isMiniAndClosed = React.useMemo(() => {
        return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
    }, [sidebarOptions.view, sidebarOptions.open]);

    return (
        <List
            disablePadding
            sx={{
                mr: isMiniAndClosed ? 0 : 2,
                pb: 2
            }}
        >
            {
                items.map((item, index) => (
                    <JumboNavIdentifier translate item={item} key={index} />
                ))
            }
        </List>
    );
};

JumboVerticalNavbar.defaultProps = {
    items: PropTypes.array,
    translate: false
};

export default JumboVerticalNavbar;