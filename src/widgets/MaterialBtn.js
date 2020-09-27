import * as React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

export default class MaterialBtn extends React.Component {

    static defaultProps = {
        style: {},
        content: "MaterialButton",
        variant: "contained",
        color: "secondary",
        textTransform: "capitalize",
        onClick: () => {
            console.log(`Unhandled button click`);
        }
    };

    static propTypes = {
        textColor: PropTypes.string,
        variant: PropTypes.oneOf(["contained", "text", "default"]),
        content: PropTypes.any,
        textTransform: PropTypes.oneOf(["none", "uppercase", "lowercase", "capitalize"]),
        onClick: PropTypes.func,
        color: PropTypes.string,
        startIcon: PropTypes.any,
        endIcon: PropTypes.any,
        padding: PropTypes.number,
    };


    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    render() {

        let {
            textColor,
            textTransform,
            onClick,
            className,
            content,
            startIcon,
            endIcon,
            style: {textTransform: styleTextTransform, ...style},
            variant,
            color,
            children,
            ...props
        } = this.props;

        style.textTransform = styleTextTransform || textTransform;

        if (!(color === "secondary" || color === "primary")) {
            style.backgroundColor = color;
            color = undefined;
        }

        style.color = textColor;

        return (
            <Button
                ref={this.ref}
                startIcon={startIcon}
                endIcon={endIcon}
                onClick={
                    e => {
                        let propagate = onClick(e);

                        if (propagate === true || propagate === undefined) e.stopPropagation();

                    }
                }
                style={style}
                color={color}
                className={className}
                variant={variant}
                {...props}>
                {content}
                {children}
            </Button>
        );
    }
}