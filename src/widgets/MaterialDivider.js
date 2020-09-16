import React from "react";
import Divider from "@material-ui/core/Divider";
import Colors from "../Colors";
import Settings from "../utils/Settings";

export default class MaterialDivider extends React.Component {

    props = {
        height: 32,
        spacing: 100
    };

    constructor(props) {
        super(props);
    }


    render() {
        let {orientation = "horizontal", height, spacing, style,color = Settings.colorSecondary} = this.props;

        if (orientation === "horizontal")
            style = {
                ...style,
                height: height,
                marginTop: spacing,
                marginBottom: spacing
            };
        else
            style = {...style, height: height, width: 1, marginRight: spacing, marginLeft: spacing};

        return (
            <Divider style={{...style, backgroundColor: color}} orientation={orientation}/>
        );
    }
}