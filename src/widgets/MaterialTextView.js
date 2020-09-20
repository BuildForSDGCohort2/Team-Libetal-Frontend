import React from "react";
import {Typography} from "@material-ui/core";
import PropTypes from "prop-types";


export default class MaterialTextView extends React.Component {


    static propTypes = {
        textColor:PropTypes.string,
        text: PropTypes.string.isRequired,
        variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "small", "body", "body1", "body2"]),
        fontSize:PropTypes.oneOfType([PropTypes.string,PropTypes.number])
    };

    static  defaultProps = {
        style: {}
    };

    constructor(props) {
        super(props);

        this.ref = React.createRef();
    }

    render() {

        let {
            textColor,
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
                    ...style,
                    color:textColor
                }}
                variant={variant}>
                {text}
            </Typography>
        );
    }
}