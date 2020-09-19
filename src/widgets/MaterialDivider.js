import React from "react";
import Divider from "@material-ui/core/Divider";
import Settings from "../utils/Settings";
import PropTypes from "prop-types";

export default class MaterialDivider extends React.Component {


    static HORIZONTAL = "horizontal";
    static VERTICAL = "vertical";


    static propTypes = {
        orientation: PropTypes.string,
        height: PropTypes.number,
        spacing: PropTypes.number,
        style: PropTypes.object,
        color:PropTypes.string
    };


    render() {
        let {orientation = "horizontal", height, spacing, style, color = Settings.colorSecondary} = this.props;

        if (orientation === "horizontal")
            style = {
                ...style,
                height: height,
                marginTop: spacing,
                marginBottom: spacing
            };
        else style = {...style, height: height, width: 1, marginRight: spacing, marginLeft: spacing};

        return (
            <Divider style={{...style, backgroundColor: color}} orientation={orientation}/>
        );
    }
}