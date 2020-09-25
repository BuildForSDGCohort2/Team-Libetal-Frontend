import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import PropTypes from "prop-types";
import Flex from "../Flex";

export default class MaterialCol extends Component {


    // noinspection DuplicatedCode
    static propTypes = {
        justify: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_AROUND, Flex.SPACE_BETWEEN, Flex.SPACE_EVENLY,Flex.STRETCH]),
        alignItems: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_AROUND, Flex.SPACE_BETWEEN, Flex.SPACE_EVENLY,Flex.STRETCH]),
        alignContent: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_AROUND, Flex.SPACE_BETWEEN, Flex.SPACE_EVENLY,Flex.STRETCH]),
        paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        backgroundColor:PropTypes.string,
        paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onClick: PropTypes.func,
        spacing: PropTypes.number,
    };

    static defaultProps = {
        alignItems: Flex.START,
        justify: Flex.START
    };

    render() {

        // noinspection DuplicatedCode
        let {
            justify,
            alignItems,
            alignContent,
            direction,
            paddingLeft,
            paddingRight,
            paddingTop,
            paddingBottom,
            marginLeft,
            marginRight,
            marginTop,
            marginBottom,
            height,
            width,
            spacing,
            backgroundColor,
            maxHeight,
            maxWidth,
            onClick,
            style: {...style} = {},
            ...props
        } = this.props;

        // Uses the one defined in props first before the one in style
        style.paddingLeft = paddingLeft || style.paddingLeft;
        style.paddingRight = paddingRight || style.paddingRight;
        style.paddingTop = paddingTop || style.paddingTop;
        style.paddingBottom = paddingBottom || style.paddingBottom;
        style.height = height || style.height;
        style.width = width || style.width;
        style.maxHeight = maxHeight || style.maxHeight;
        style.maxWidth = maxWidth || style.maxWidth;
        style.backgroundColor = backgroundColor || style.backgroundColor;

        return (
            <Grid
                container
                spacing={spacing}
                onClick={onClick}
                direction={"column"}
                alignItems={alignItems}
                justify={justify}
                alignContent={alignContent}
                style={style}
                {...props}/>
        );
    }
}