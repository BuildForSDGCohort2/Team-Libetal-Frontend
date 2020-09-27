import React, {Component} from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Settings from "../../../utils/Settings";
import PropTypes from "prop-types";

export default class Teams extends Component {


    static propTypes = {
        navigator: PropTypes.func.isRequired
    };

    render() {
        return (
            <ThemeProvider theme={Settings.appTheme}>
                Contains actions involving new issue discussion,
                Discussions affecting the product,
                And insights depending on team
                team productivity, team projects
                team issues and features.
            </ThemeProvider>
        );
    }
}