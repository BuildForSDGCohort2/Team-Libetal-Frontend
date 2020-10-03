import React from "react";
import {Typography} from "@material-ui/core";
import PropTypes from "prop-types";


export default class MaterialTextView extends React.Component {


    static propTypes = {
        textAlign:PropTypes.oneOf(["left","right","center"]),
        textColor:PropTypes.string,
        text: PropTypes.string,
        variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "small", "body", "body1", "body2","caption"]),
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
            textAlign,
            style: {fontSize: cFontSize, ...style},
            ...props
        } = this.props;

        style.textAlign = textAlign || style.textAlign

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
                {this.props.children}
            </Typography>
        );
    }
}