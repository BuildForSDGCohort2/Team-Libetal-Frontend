import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";

export default class MaterialGrid extends Component {


    getCustomStyles() {
        let {
            flexGrow,
            paddingTop,
            padding,
            style
        } = this.props;

        let customStyles = {...style};

        customStyles = flexGrow === undefined ? customStyles : {...customStyles, flexGrow};
        customStyles = paddingTop === undefined ? customStyles : {...customStyles, paddingTop};
        customStyles = padding === undefined ? customStyles : {...customStyles, padding};

        return customStyles;
    }

    filterCustomProps() {
        let {
            alignContent,
            alignItems,
            container,
            direction,
            item,
            justify,
            spacing,
            wrap,
            zeroMinWidth,
        } = this.props;

        return {
            alignContent,
            alignItems,
            container,
            direction,
            item,
            justify,
            spacing,
            wrap,
            zeroMinWidth
        };

    }

    render() {
        let customStyles = this.getCustomStyles();

        let style = this.props.style;

        if (style !== undefined) {
            style = {...style, ...customStyles};
        } else style = customStyles;

        return (
            <Grid {...this.props} style={style}>{this.props.children}</Grid>
        );
    }
}