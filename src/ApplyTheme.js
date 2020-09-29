import {ThemeProvider, useTheme} from "@material-ui/core/styles";
import Settings from "./utils/Settings";
import darkTheme from "./styles/dark/Theme.module.css";
import lightTheme from "./styles/light/Theme.module.css";
import React from "react";

export default function ApplyTheme({initTheme, children, useStyles}) {
    const classes = useStyles();
    const theme = initTheme();

    // THIS SHOULD BE STYLES appStyles
    let styles = Settings.style === "dark" ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}  >
            {children({
                classes,
                /**@Depricated*/
                appTheme: styles,
                theme,
                styles
            })}
        </ThemeProvider>
    );
}