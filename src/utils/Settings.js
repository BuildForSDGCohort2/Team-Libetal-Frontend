import {amber, cyan, green, orange, red} from "@material-ui/core/colors";


export default class Settings {

    static style = "light";

    static white = "#FFFFFF";

    static black = "#000000";

    static orange = orange[900];

    static orangeLight = orange[700];

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
        return this.style === "light" ? this.white : this.black;
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
