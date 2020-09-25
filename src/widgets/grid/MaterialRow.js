import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Flex from "../Flex";
import MaterialTheme from "../theming/MaterialTheme";

export default class MaterialRow extends Component {

    // noinspection DuplicatedCode
    static propTypes = {
        theme: PropTypes.func,
        justify: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_AROUND, Flex.SPACE_BETWEEN, Flex.SPACE_EVENLY,Flex.STRETCH]),
        alignItems: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_AROUND, Flex.SPACE_BETWEEN, Flex.SPACE_EVENLY,Flex.STRETCH]),
        alignContent: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_AROUND, Flex.SPACE_BETWEEN, Flex.SPACE_EVENLY,Flex.STRETCH]),
        paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    static defaultProps = {
        alignItems: Flex.START,
        justify: Flex.START,
        theme: MaterialTheme
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
            theme,
            style: {...style} = {},
            ...props
        } = this.props;

        // Uses the one defined in props first before the one in styes
        style.paddingLeft = paddingLeft || style.paddingLeft;
        style.paddingRight = paddingRight || style.paddingRight;
        style.paddingTop = paddingTop || style.paddingTop;
        style.paddingBottom = paddingBottom || style.paddingBottom;
        style.marginLeft = marginLeft || style.marginLeft;
        style.marginRight = marginRight || style.marginRight;
        style.marginTop = marginTop || style.marginTop;
        style.marginBottom = marginBottom || style.marginBottom;
        style.height = height || style.height;
        style.width = width || style.width;

        return (
            <Grid
                container
                justify={justify}
                alignContent={alignContent}
                alignItems={alignItems}
                direction={"row"}
                style={style}
                {...props}
            />
        );
    }
}