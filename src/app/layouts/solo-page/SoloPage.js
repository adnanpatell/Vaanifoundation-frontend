import React from "react";
import JumboLayout from "@jumbo/components/JumboLayout";
import useJumboLayout from "@jumbo/hooks/useJumboLayout";
import layoutConfig from "./layoutConfig";
import CustomLayout from "../../../app/pages/public-site/layout/CustomLayout"


const SoloPage = (props) => {

    const {setJumboLayoutOptions} = useJumboLayout();

    React.useEffect(() => {
        setJumboLayoutOptions(layoutConfig);
    }, []);

    return (
        <JumboLayout>

            {
                (props.activeTopNav) ? (
                    <CustomLayout>
                        {props.children}
                    </CustomLayout>
                ) : (
                    props.children
                )
            }
        </JumboLayout>
    );
};

export default SoloPage;
