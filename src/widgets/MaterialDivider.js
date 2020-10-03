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
        color: PropTypes.string,
        spacingEnd: PropTypes.number,
        spacingStart: PropTypes.number
    };

    static defaultProps = {
        spacing: 1,
        style: {}
    };

    render() {
        let {
            orientation = "horizontal",
            height,
            width,
            spacing = 0,
            style: {...style},
            color = Settings.colorSecondary
        } = this.props;

        style.backgroundColor = color;

        if (orientation === "horizontal") {
            style.marginTop = style.marginBottom = spacing;
            style.height = style.height || height || 1;
            style.width = style.width || width || "inherit";
        } else {
            style.marginRight = style.marginLeft = spacing;
            style.height = style.height || height || 40;
            style.width = style.width || width || 1;
        }


        return (
            <Divider style={style} orientation={"vertical"}/>
        );
    }
}