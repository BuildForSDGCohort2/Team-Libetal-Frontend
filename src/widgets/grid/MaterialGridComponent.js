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
        marginTB: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingLR: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingTB: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        overflow: PropTypes.string,
        overflowX: PropTypes.string,
        overflowY: PropTypes.string,
        xs: PropTypes.number,
        xm: PropTypes.number,
        xl: PropTypes.number,
        sm: PropTypes.number,
        lg: PropTypes.number
    };

    render() {
        // noinspection DuplicatedCode
        let {
            justify,
            alignItems,
            alignContent,
            direction,
            style: {
                background: sBackground,
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
                minWidth: sMinWidth,
                overflow: sOverflow,
                overflowX: sOverflowX,
                overflowY: sOverflowY,
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
            minWidth = sMinWidth,
            theme,
            color,
            sm,
            lg,
            xs,
            xm = sm,
            xl = lg,
            spacing,
            maxHeight = sMaxHeight,
            maxWidth = sMaxWidth,
            backgroundImage,
            backgroundColor = sBackgroundColor,
            overflow = sOverflow,
            overflowX = sOverflowX,
            overflowY = sOverflowY,
            ...props
        } = this.props;

        if (backgroundImage !== undefined) style.backgroundImage = `url(${backgroundImage})`;
        style.paddingLeft = paddingLeft;
        style.paddingRight = paddingRight;
        style.paddingTop = paddingTop;
        style.paddingBottom = paddingBottom;
        style.marginLeft = marginLeft;
        style.marginRight = marginRight;
        style.marginTop = marginTop;
        style.marginBottom = marginBottom;
        if (height !== undefined) style.height = height;
        if (width !== undefined) style.width = width;
        if (maxHeight !== undefined) style.maxHeight = maxHeight;
        if (maxWidth !== undefined) style.maxWidth = maxWidth;
        if (minWidth !== undefined) style.minWidth = minWidth;
        if (minHeight !== undefined) style.minHeight = minHeight;
        if (overflow !== undefined) style.overflow = overflow;
        if (overflowX !== undefined) style.overflowX = overflowX;
        if (overflowY !== undefined) style.overflowY = overflowY;

        style.backgroundColor = backgroundColor;

        return (
            <Grid
                container
                style={style}
                spacing={spacing}
                justify={justify}
                color={"secondary"}
                alignItems={alignItems}
                direction={this.direction}
                alignContent={alignContent}
                xs={xs}
                sm={xm}
                lg={xl}
                {...props}
            />
        );
    }
}