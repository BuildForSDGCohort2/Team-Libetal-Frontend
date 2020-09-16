import React from "react";
import {withProps} from "recompose";
import * as Icons from "@material-ui/icons";
import Icon from "@material-ui/core/Icon";



export default class MaterialIcon extends React.Component {

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
                ...style
            } = {},
            ...props
        } = this.props;

        iconName = iconName || icon;

        let Icon = withProps({
            ...props
        })(Icons[iconName]);

        return (
            <Icon
                style={{
                    ...style,
                    height: iconSize,
                    width: iconSize
                }}
            />
        );
    }
}