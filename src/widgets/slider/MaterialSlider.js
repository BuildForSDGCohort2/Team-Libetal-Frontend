import React, {Component} from "react";
import Slider from "@material-ui/core/Slider";
import {ThemeProvider} from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Settings from "../../utils/Settings";
import Colors from "../../Colors";
import PropTypes from "prop-types";

export default class MaterialSlider extends Component {

    static propTypes = {
        color: PropTypes.string,
        defaultValue: PropTypes.number,
        step: PropTypes.number,
        valueLabelDisplay: PropTypes.string,
        max:PropTypes.number,
        min:PropTypes.number,
    };

    static defaultProps = {};

    static lightTheme = createMuiTheme({
        palette: {
            primary: {
                main: Colors.orange,
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
            }
        }
    });

    static get sliderTheme() {
        if (Settings.palette === "light") {
            return this.lightTheme;
        }

        return Settings.darkTheme;
    }

    render() {

        let {
            step,
            max,
            min,
            defaultValue,
        } = this.props;
        return (
            <ThemeProvider theme={MaterialSlider.sliderTheme}>
                <Slider
                    defaultValue={80}
                    step={step}
                    max={max}
                    min={min}
                />
            </ThemeProvider>
        );
    }
}