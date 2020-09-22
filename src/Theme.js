import React from "react";
import {createMuiTheme, makeStyles, ThemeProvider, useTheme} from "@material-ui/core/styles";
import darkTheme from "./styles/dark/Theme.module.css";
import lightTheme from "./styles/light/Theme.module.css";
import Settings from "./utils/Settings";
import {orange} from "@material-ui/core/colors";


const drawerWidth = 240;
let colorPrimary = orange["500"];
let textPrimary = "#FFFFFF";
let colorSecondary = "";
let textSecondary = "";

const lTheme = createMuiTheme({
    palette: {
        primary: {
            main: Settings.colorPrimary,
            dark: Settings.colorPrimaryDark,
            contrastText: Settings.textPrimary,
            light: Settings.colorPrimaryLight
        },
        secondary: {
            main: Settings.colorSecondary,
            dark: Settings.colorSecondaryDark,
            /**TODO eddit for hover states
             light: "#FFFFFF",
             dark: "#FFFFFF",*/
            contrastText: Settings.textSecondary
        },
        background: {
            default: Settings.colorPrimary,
            paper: Settings.colorPrimary
        }
    }
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        // zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    clippingDrawerAppBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: "none"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300
    },
    chips: {
        display: "flex",
        flexWrap: "wrap"
    },
    chip: {
        margin: 2
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        /*Scroll bad causes poor transition effect on bottom items*/
        overflowX: "hidden"
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(7)
        }
    },

    toolbar: {
        flexWrap: "wrap",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    grow: {
        flexGrow: 1
    },
    content: {
        flexGrow: 1,
        paddingTop: 12,
        paddingLeft: 8,
        paddingRight: 8
    },
    "@global": {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: "none"
        }
    },

    toolbarTitle: {
        flexGrow: 1
    },
    link: {
        margin: theme.spacing(1, 1.5)
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6)
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[700]
    },
    cardPricing: {
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        marginBottom: theme.spacing(2)
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up("sm")]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6)
        }
    },
    avatarLarge: {
        height: 100,
        width: 100
    }
}));


export default function Theme({props, children}) {

    const classes = useStyles();
    const theme = useTheme();

    // THIS SHOULD BE STYLES appStyles
    let styles = Settings.style === "dark" ? darkTheme : lightTheme;

    return (
        <ThemeProvider
            theme={lTheme}>
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