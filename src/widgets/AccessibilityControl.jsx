import React, {Component} from "react";
import MaterialIconButton from "./button/MaterialIconButton";
import Settings from "../utils/Settings";
import PropTypes from "prop-types";


export default class AccessibilityControl extends Component {


    static propTypes = {
        componentInstance: PropTypes.object.isRequired
    };

    render() {

        let {
            componentInstance
        } = this.props;
        return (
            <MaterialIconButton
                icon={"InvertColors"}
                onClick={
                    e => {
                        let {
                            palette
                        } = Settings;

                        if (palette === "light") {
                            Settings.palette = "dark";
                        } else Settings.palette = "light";

                        componentInstance.forceUpdate();

                        console.log(`Updated theme to ${Settings.palette}`);

                        return true;
                    }
                }
            />
        );
    }
}