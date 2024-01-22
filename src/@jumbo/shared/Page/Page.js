import React from 'react';
import useJumboApp from "@jumbo/hooks/useJumboApp";
import {config} from "../../../app/config/main";

const Page = ({component, layout, topNavBar, ...restProps}) => {
    const {activeLayout, setActiveLayout} = useJumboApp();
    const {activeTopNav, setActiveTopNav} = useJumboApp();
    React.useEffect(() => {
        if (layout !== activeLayout) {
            setActiveLayout(layout);
            setActiveTopNav(topNavBar);
        }
    }, [layout]);
    
    const PageComponent = component;

    return (
        <PageComponent {...restProps} />
    );
};

Page.defaultProps = {
    layout: config.defaultLayout
};

export default Page;