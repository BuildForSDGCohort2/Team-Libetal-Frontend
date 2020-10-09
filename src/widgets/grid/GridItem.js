import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

export default class GridItem extends Component {

    static propTypes = {
        padding: PropTypes.number,
        paddingRight: PropTypes.number,
        paddingLeft: PropTypes.number,
        paddingTop: PropTypes.number,
        paddingBottom: PropTypes.number,
        marginLeft: PropTypes.number,
        marginLR: PropTypes.number,
        marginRight: PropTypes.number,
        marginTop: PropTypes.number,
        marginBottom: PropTypes.number,
        paddingLR: PropTypes.number,
        paddingTB: PropTypes.number,
        flexGrow: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number,
        minHeight: PropTypes.number,
        backgroundColor: PropTypes.string,
        overflowY: PropTypes.string
    };

    render() {
        let {
            style: {
                minHeight: sMinHeight,
                padding: sPadding,
                margin: sMargin,
                marginLeft: sMarginLeft,
                marginRight: sMarginRight,
                marginTop: sMarginTop,
                marginBottom: sMarginBottom,
                ...style
            } = {},
            padding = sPadding,
            paddingLR = padding,
            paddingTB = padding,
            paddingTop = paddingTB,
            paddingBottom = paddingTB,
            paddingLeft = paddingLR,
            paddingRight = paddingLR,
            margin = sMargin,
            marginLR = margin,
            marginTB = margin,
            marginLeft = marginLR || sMarginLeft,
            marginRight = marginLR || sMarginRight,
            marginTop = marginTB || sMarginTop,
            marginBottom = marginTB || sMarginBottom,
            height,
            minHeight = sMinHeight,
            overflowY,
            backgroundColor,
            flexGrow,
            ...props
        } = this.props;

        if (paddingRight !== undefined) style.paddingRight = paddingRight;
        if (minHeight !== undefined) style.minHeight = minHeight;
        if (paddingLeft !== undefined) style.paddingLeft = paddingLeft;
        if (paddingTop !== undefined) style.paddingTop = paddingTop;
        if (paddingBottom !== undefined) style.paddingBottom = paddingBottom;
        if (marginRight !== undefined) style.marginRight = marginRight;
        if (marginLeft !== undefined) style.marginLeft = marginLeft;
        if (marginTop !== undefined) style.marginTop = marginTop;
        if (marginBottom !== undefined) style.marginBottom = marginBottom;
        if (backgroundColor !== undefined) style.backgroundColor = backgroundColor;
        if (height !== undefined) style.height = height;
        if (overflowY !== undefined) style.overflowY = overflowY;
        if (flexGrow !== undefined) style.flexGrow = flexGrow || style.flexGrow;

        return (
            <Grid
                style={style}
                item
                {...props}
            />
        );
    }
}