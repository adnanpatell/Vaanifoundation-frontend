import {LAYOUT_CONTAINER_STYLES} from "@jumbo/utils/constants/layout";
import {mainTheme} from "../themes/main/default";
import {headerTheme} from "../themes/header/default";
import {sidebarTheme} from "../themes/sidebar/default";
import {footerTheme} from "../themes/footer/default";
import LAYOUT_NAMES from "../layouts/layouts";
import {createJumboTheme} from "@jumbo/utils";
import authServices from "../services/auth-services";
import jwtAuthAxios from "../services/auth/jwtAuth";

const config = {

    defaultLayout: LAYOUT_NAMES.VERTICAL_DEFAULT,
    containerStyle: LAYOUT_CONTAINER_STYLES.FLUID,

    theme: createJumboTheme(mainTheme, headerTheme, sidebarTheme, footerTheme),

    authSetting: {
        axiosObject: jwtAuthAxios,
        fallbackPath: "/user/login",
        getAuthUserService: authServices.getCurrentUser,
        redirectNotAuthenticatedPath: "/"
    },

};

export {config};
