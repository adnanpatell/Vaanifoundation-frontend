import React from 'react';
import JumboAppContext from "@jumbo/components/JumboApp/JumboAppContext";

const JumboApp = (props) => {
    const [activeLayout, setActiveLayout] = React.useState(props.activeLayout);
    const [activeTopNav, setActiveTopNav] = React.useState(props.activeTopNav);
    const [rebuildRoutes, setRebuildRoutes] = React.useState(true);

    React.useEffect(() => {
        if(rebuildRoutes) {
            setRebuildRoutes(false);
        }
    }, [rebuildRoutes]);

    const appContextValue = React.useMemo(() => {
        return {
            activeLayout,
            setActiveLayout,
            rebuildRoutes,
            setRebuildRoutes,
            setActiveTopNav,
            activeTopNav
        }
    }, [activeLayout, setActiveLayout, rebuildRoutes, setRebuildRoutes, setActiveTopNav, activeTopNav]);

    return (
        <JumboAppContext.Provider value={appContextValue}>
            {props?.children}
        </JumboAppContext.Provider>
    );
};

export default JumboApp;