import {amber, cyan, green, red} from "@material-ui/core/colors";
import Colors from "../Colors";


export default class Settings {

    static theme ="Light";

    static style = "light";

    static palette = "light"

    static white = "#FFFFFF";

    static black = "#000000";

    static orange = Colors.deep_orange;

    static orangeLight = Colors.orange;

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
