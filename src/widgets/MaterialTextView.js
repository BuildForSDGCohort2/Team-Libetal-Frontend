import React from "react";
import {Typography} from "@material-ui/core";


export default class MaterialTextView extends React.Component {


    props = {
        text: "TextView",
        fontSize: undefined,
        style: {}
    };

    static  defaultProps = {
        style: {}
    };

    render() {

        let {
            text,
            variant,
            fontSize,
            style: {fontSize: cFontSize, ...style},
            ...props
        } = this.props;

        if (variant === undefined) style.fontSize = fontSize || cFontSize;

        return (
            <Typography
                {...props}
                style={{
                    ...style
                }}
                variant={variant}>
                {text}
            </Typography>
        );
    }
}