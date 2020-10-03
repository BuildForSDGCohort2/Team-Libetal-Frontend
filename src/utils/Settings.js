import {amber, cyan, green, red} from "@material-ui/core/colors";
import Colors from "../Colors";
import {createMuiTheme} from "@material-ui/core/styles";


export default class Settings {

    static theme = "Light";

    static style = "light";

    static palette = "dark";

    static white = "#FFFFFF";

    static black = "#000000";

    static orange = Colors.deep_orange;

    static orangeLight = Colors.orange;


    static lightTheme = createMuiTheme({
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



    static darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#202020",
                dark: "#101010",
                contrastText: "#FFFFFF",
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
                default: "#303030",
                paper: "#303030"
            },
            text: {
                primary: "#FFFFFF",
                secondary: "rgba(255,255,255,.8)",
                disabled: "rgba(255,255,255,.5)"
            }
        }
    });


    static get appTheme() {
        if (this.palette === "light") return this.lightTheme;

        return this.darkTheme;
    }

    static get appBackground (){
        if (this.palette === "light") return Colors.white;

        return "#303030";
    }

    static get isLight() {
        return this.style === "light";
    }

    static get colorSuccess() {
        return this.isLight ? green[800] : green[500];
    }

    static get colorSuccessDark() {
        return this.isLight ? green[900] : green[400];
    }

    static get textSuccess() {
        return this.isLight ? this.white : this.white;
    }

    static get colorPrimary() {
        return this.style === "light" ? Colors.white : Colors.black;
    }

    static get colorPrimaryLight() {
        return this.style === "light" ? red[900] : red[900];
    }

    /*TODO*/
    static get colorPrimaryDark() {
        return this.style === "light" ? red[900] : red[900];
    }

    static get textPrimary() {
        return this.style === "light" ? this.orange : red[900];
    }

    static get textSecondary() {
        return this.style === "light" ? this.white : cyan[500];
    }

    /*todo*/
    static get colorSecondaryDark() {
        return this.style === "light" ? this.orange : red[900];
    }

    static get colorSecondary() {
        return this.style === "light" ? this.orangeLight : amber[900];
    }


}
