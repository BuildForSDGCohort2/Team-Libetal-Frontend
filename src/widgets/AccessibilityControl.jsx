import React,{Component} from "react"
import MaterialIconButton from "./button/MaterialIconButton";
import Settings from "../utils/Settings";
import PropTypes from "prop-types"


export default class AccessibilityControl extends Component{


    static propTypes ={
        componentInstance:PropTypes.object
    }
    render() {

        let {
            componentInstance
        } = this.props
        return (
            <MaterialIconButton
                icon={"InvertColors"}
                onClick={
                    e => {
                        let curr = Settings.theme;
                        let style = Settings.style;

                        if (curr === "Light") {
                            Settings.theme = "Dark";
                        }else Settings.theme ="Light"

                        if (style === "light") {
                            Settings.style = "dark";
                        }else Settings.style ="light"

                        console.log(Settings.theme)

                        componentInstance.forceUpdate();
                    }
                }
            />
        );
    }
}