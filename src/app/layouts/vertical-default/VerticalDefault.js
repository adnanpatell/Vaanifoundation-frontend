import React, { useContext, useState } from "react";
import JumboLayout from "@jumbo/components/JumboLayout";
import Header from "../shared/headers/Header";
import Sidebar from "../shared/sidebars/Sidebar";
import Footer from "../shared/footers/Footer";
import useJumboLayout from "@jumbo/hooks/useJumboLayout";
import JumboCustomizer from "../../shared/JumboCustomizer/JumboCustomizer";
import JumboCustomizerButton from "../../shared/JumboCustomizer/JumboCustomizerButton";
import useJumboHeaderTheme from "@jumbo/hooks/useJumboHeaderTheme";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import {SIDEBAR_STYLES, SIDEBAR_VARIANTS, SIDEBAR_VIEWS} from "@jumbo/utils/constants";
import {headerTheme as theme4} from "../../themes/header/theme4";
import {headerTheme as defaultTheme} from "../../themes/header/default";
import useApp from "../../hooks/useApp";
import layoutConfig from "./layoutConfig";
import {useMediaQuery} from "@mui/material";
import {AuthContext} from "@jumbo/components/JumboAuthProvider/JumboAuthContext";
import useJumboAuth from '@jumbo/hooks/useJumboAuth';
import { useDispatch, useSelector } from "react-redux";
import menus from "../shared/sidebars/Sidebar/menus";

const VerticalDefault = (props) => {
    const authCtx = useJumboAuth();
    const authDataContext = useContext(AuthContext);
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const roleDataStore = useSelector((state)=> state?.user?.AUTH_ACCESS || {});
    const {setJumboLayoutOptions} = useJumboLayout();
    const {headerTheme, setHeaderTheme} = useJumboHeaderTheme();
    const {theme} = useJumboTheme();
    const appBarBgColor = headerTheme.components?.MuiAppBar?.styleOverrides?.root?.background;
    const {sidebarOptions} = useJumboLayoutSidebar();
    const appData = useApp();
    const [roleData, setRoleData] = useState(roleDataStore);

    console.log(roleData, "roleData authDataContext")
    React.useEffect(() => {
        setJumboLayoutOptions(layoutConfig)
    }, [authDataContext, roleDataStore, items, roleData]);


    React.useEffect(() => {

        if (appBarBgColor === "#F5F7FA" && sidebarOptions.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER) {
            setHeaderTheme({...theme, ...theme4});
            appData.setAppState({
                prevHeaderBgColor: theme?.mode === "dark" ? "#222D45" :"#F5F7FA",
            });
        } else if (appData.prevHeaderBgColor && appData.prevHeaderBgColor === "#F5F7FA") {
            setHeaderTheme({...theme, ...defaultTheme});
        }

    }, [authDataContext, sidebarOptions.style, roleDataStore, items, roleData]);

    
    
    React.useEffect(()=>{
        handleMenus();
        return () => setItems([]);
    },[dispatch, roleDataStore, roleData, authDataContext]);

    const handleMenus = () => {
        if(roleData && roleData.access){
            let items = menus.map((it)=> {
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
    
            setItems(items);
        }else{
            setItems([]);
        }
        
    }
    return (
        <JumboLayout
            header={<Header socket={props.socket} />}
            sidebar={<Sidebar items={items} />}
            footer={<Footer/>}
            headerSx={{
                height: 80,
            }}
        >
            {props.children}
            {/* <JumboCustomizer/>
            <JumboCustomizerButton/> */}
        </JumboLayout>
    );
};

export default VerticalDefault;
