import * as React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

export default class MaterialBtn extends React.Component {

    static defaultProps = {
        style: {},
        content: "MaterialButton",
        variant: "contained",
        color: "secondary",
        textTransform: "uppercase",
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
        margin: PropTypes.number,
        marginLR: PropTypes.number,
        marginRight: PropTypes.number,
        marginLeft: PropTypes.number,
        marginTB: PropTypes.number,
        marginTop: PropTypes.number,
        marginBottom: PropTypes.number,
        fontSize: PropTypes.oneOf([PropTypes.string, PropTypes.number])
    };


    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    render() {

        let {
            textColor,
            onClick,
            className,
            content,
            startIcon,
            endIcon,
            style: {
                fontSize: sFontSize,
                margin: sMargin,
                marginRight: sMarginRight = sMargin,
                marginLeft: sMarginLeft = sMargin,
                marginTop: sMarginTop = sMargin,
                marginBottom: sMarginBottom = sMargin,
                padding: sPadding,
                paddingLeft: sPaddingLeft = sPadding,
                paddingRight: sPaddingRight = sPadding,
                paddingTop: sPaddingTop = sPadding,
                paddingBottom: sPaddingBottom = sPadding,
                textTransform: styleTextTransform,
                ...style
            },
            textTransform = styleTextTransform,
            padding,
            paddingTB = padding,
            paddingLR = padding,
            paddingLeft = paddingLR || sPaddingLeft,
            paddingRight = paddingLR || sPaddingRight,
            paddingTop = paddingTB || sPaddingTop,
            paddingBottom = paddingTB || sPaddingBottom,
            fontSize = sFontSize,
            variant,
            color,
            children,
            margin,
            marginLR = margin,
            marginTB = margin,
            marginRight = marginLR || sMarginRight,
            marginLeft = marginLR || sMarginLeft,
            marginTop = marginTB || sMarginTop,
            marginBottom = marginTB || sMarginBottom,
            ...props
        } = this.props;

        style.textTransform = styleTextTransform || textTransform;

        if (!(color === "secondary" || color === "primary")) {
            style.backgroundColor = color;
            color = undefined;
        }

        style.color = textColor;
        style.marginRight = marginRight;
        style.marginLeft = marginLeft;
        style.marginTop = marginTop;
        style.marginBottom = marginBottom;
        style.paddingLeft = paddingLeft;
        style.paddingRight = paddingRight;
        style.paddingTop = paddingTop;
        style.paddingBottom = paddingBottom;
        style.fontSize = fontSize;

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