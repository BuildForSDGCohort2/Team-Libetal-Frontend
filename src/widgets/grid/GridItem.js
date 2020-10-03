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
        marginRight: PropTypes.number,
        marginTop: PropTypes.number,
        marginBottom: PropTypes.number,
        paddingLR: PropTypes.number,
        paddingTB: PropTypes.number,
        flexGrow: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number,
        backgroundColor: PropTypes.string,
        overflowY: PropTypes.string
    };

    render() {
        let {
            style: {
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
            overflowY,
            backgroundColor,
            flexGrow,

            ...props
        } = this.props;

        style.paddingRight = paddingRight;
        style.paddingLeft = paddingLeft;
        style.paddingTop = paddingTop;
        style.paddingBottom = paddingBottom;
        style.marginRight = marginRight;
        style.marginLeft = marginLeft;
        style.marginTop = marginTop;
        style.marginBottom = marginBottom;
        style.backgroundColor = backgroundColor;
        style.height = height;
        style.overflowY = overflowY;


        style.flexGrow = flexGrow || style.flexGrow;
        return (
            <Grid
                style={style}
                item
                {...props}
            />
        );
    }
}