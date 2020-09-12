import * as React from "react";
import Button from "@material-ui/core/Button";

export default class MaterialBtn extends React.Component {

    props = {
        content: "MaterialButton",
        variant: "contained",
        color: "secondary",
        onClick: () => {
            console.log("Unhandled Click");
        }
    };

    render() {

        let {
            onClick,
            className,
            content,
            startIcon,
            endIcon,
            style,
            variant,
            color = "secondary",
            children,
            ...props
        } = this.props;

        return (
            <Button
                startIcon={startIcon}
                endIcon={endIcon}
                onClick={onClick}
                style={style}
                className={className}
                variant={variant}
                color={color}
                {...props}>
                {content}
                {children}
            </Button>
        );
    }
}