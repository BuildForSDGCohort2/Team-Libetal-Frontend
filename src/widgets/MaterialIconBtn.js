import React from "react";
import {IconButton} from "@material-ui/core";
import {withProps} from "recompose";
import * as Icons from "@material-ui/icons";

export default class MaterialIconBtn extends React.Component {

    props = {
        icon: "Apps",
        iconSize: 24,
        iconName: "Apps",
        iconPadding: 4,
        color: "primary",
        style: {}
    };

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