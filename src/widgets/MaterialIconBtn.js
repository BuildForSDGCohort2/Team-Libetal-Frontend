import React from "react";
import {IconButton} from "@material-ui/core";
import {withProps} from "recompose";
import * as Icons from "@material-ui/icons";
import PropTypes from "prop-types"

export default class MaterialIconBtn extends React.Component {

    static defaultProps = {
        iconSize: 24,
        iconPadding: 2,
        color: "secondary",
        style: {}
    };

    static propTypes ={
        icon: PropTypes.string,
        iconName:PropTypes.string
    }

    render() {
        let {
            icon = "Apps",
            iconSize = 24,
            iconName,
            iconPadding,
            color = "secondary",
            style: {
                height,
                width,
                padding,
                paddingTop,
                paddingBottom,
                paddingLeft,
                paddingRight,
                ...style
            } = {},
            ...props
        } = this.props;

        if (!(color === "secondary" || color === "primary" || color === "action" || color === "inherit" || color === "disabled")) {
            color = undefined;
            style.color=color
        }


        padding = iconPadding || padding || 4;

        iconName = iconName || icon;

        let Icon = withProps({
            ...props
        })(Icons[iconName]);

        return (
            <IconButton {...props} style={{
                ...style,
                padding: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                height: iconSize + (padding * 2),
                width: iconSize + (padding * 2)
            }} color={color}>
                <Icon style={
                    {
                        height: iconSize,
                        width: iconSize
                    }
                } {...props}/>
            </IconButton>
        );
    }
}