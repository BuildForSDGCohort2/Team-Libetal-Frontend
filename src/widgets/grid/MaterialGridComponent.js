import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Flex from "../Flex";

export default class MaterialGridComponent extends Component {

    // noinspection DuplicatedCode
    static propTypes = {
        theme: PropTypes.func,
        justify: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_AROUND, Flex.SPACE_BETWEEN, Flex.SPACE_EVENLY, Flex.STRETCH]),
        alignItems: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_AROUND, Flex.SPACE_BETWEEN, Flex.SPACE_EVENLY, Flex.STRETCH]),
        alignContent: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_AROUND, Flex.SPACE_BETWEEN, Flex.SPACE_EVENLY, Flex.STRETCH]),
        spacing: PropTypes.number,
        backgroundColor: PropTypes.string,
        paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingLR: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingTB: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    render() {
        // noinspection DuplicatedCode
        let {
            justify,
            alignItems,
            alignContent,
            direction,
            style: {
                backgroundColor: sBackgroundColor,
                maxHeight: sMaxHeight,
                maxWidth: sMaxWidth,
                height: sHeight,
                width: sWidth,
                padding: sPadding,
                paddingLeft: sPaddingLeft = sPadding,
                paddingRight: sPaddingRight = sPadding,
                paddingTop: sPaddingTop = sPadding,
                paddingBottom: sPaddingBottom = sPadding,
                margin: sMargin,
                marginLeft: sMarginLeft = sMargin,
                marginRight: sMarginRight = sMargin,
                marginBottom: sMarginBottom = sMargin,
                marginTop: sMarginTop = sMargin,
                minHeight: sMinHeight,
                ...style
            } = {},
            padding = sPadding,
            paddingLR = padding,
            paddingTB = padding,
            paddingLeft = paddingLR || sPaddingLeft,
            paddingRight = paddingLR || sPaddingRight,
            paddingTop = paddingTB || sPaddingTop,
            paddingBottom = paddingTB || sPaddingBottom,
            margin,
            marginLR = margin,
            marginTB = margin,
            marginLeft = marginLR || sMarginLeft,
            marginRight = marginLR || sMarginRight,
            marginTop = marginTB || sMarginTop,
            marginBottom = marginTB || sMarginBottom,
            height = sHeight,
            width = sWidth,
            minHeight = sMinHeight,
            theme,
            spacing,
            maxHeight = sMaxHeight,
            maxWidth = sMaxWidth,
            backgroundColor = sBackgroundColor,
            ...props
        } = this.props;

        style.paddingLeft = paddingLeft;
        style.paddingRight = paddingRight;
        style.paddingTop = paddingTop;
        style.paddingBottom = paddingBottom;
        style.marginLeft = marginLeft;
        style.marginRight = marginRight;
        style.marginTop = marginTop;
        style.marginBottom = marginBottom;
        style.height = height;
        style.minHeight = minHeight;
        style.width = width;
        style.maxHeight = maxHeight;
        style.maxWidth = maxWidth;
        style.backgroundColor = backgroundColor;

        return (
            <Grid
                container
                justify={justify}
                spacing={spacing}
                alignContent={alignContent}
                alignItems={alignItems}
                direction={this.direction}
                style={style}
                {...props}
            />
        );
    }
}