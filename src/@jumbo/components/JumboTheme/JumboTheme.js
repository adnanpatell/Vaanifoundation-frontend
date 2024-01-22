import React from 'react';
import config from "@jumbo/config";
import JumboThemeContext from "@jumbo/components/JumboTheme/JumboThemeContext";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import JumboThemeHeader from "./JumboThemeHeader";
import JumboThemeSidebar from "./JumboThemeSidebar";
import JumboThemeFooter from "./JumboThemeFooter";

const JumboTheme = ({children, init}) => {
    const defaultTheme = config.theme || {}; // Set a default theme if config.theme is undefined
    const defaultLocale = config.locale || 'en'; // Set a default locale if config.locale is undefined

    const [theme, setTheme] = React.useState(init?.main || defaultTheme);
    const [muiLocale, setMuiLocale] = React.useState(config.locale || defaultLocale);

    const updateTheme = React.useCallback((options) => {
        const newTheme = createTheme({...theme, ...options}, muiLocale);
        setTheme(newTheme);
    }, [theme, muiLocale]);

    const themeContextValue = React.useMemo(() => ({
        theme: createTheme(theme, muiLocale),
        setTheme: updateTheme,
        setMuiLocale: setMuiLocale,
    }), [theme, muiLocale]);

    return (
        <JumboThemeContext.Provider value={themeContextValue}>
            <ThemeProvider theme={themeContextValue.theme}>
                <JumboThemeHeader init={init?.header}>
                    <JumboThemeSidebar init={init?.sidebar}>
                        <JumboThemeFooter init={init?.footer}>
                            {children}
                        </JumboThemeFooter>
                    </JumboThemeSidebar>
                </JumboThemeHeader>
            </ThemeProvider>
        </JumboThemeContext.Provider>
    );
};

export default JumboTheme;
