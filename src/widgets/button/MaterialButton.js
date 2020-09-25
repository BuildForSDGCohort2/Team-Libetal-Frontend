import React from "react";
import MaterialTheme from "../theming/MaterialTheme";
import PropTypes from "prop-types";


export default class MaterialButton extends React.Component {


    state = {
        state: "default" || "mouseOver" || "click",
        theme: "Light" || "Dark"
    };

    static defaultProps = {
        theme: MaterialTheme,
        themeMode: "Light",
        display: MaterialTheme.Light.Button.default.display,
        textDecoration: MaterialTheme.Light.Button.default.textDecoration,
        textAlign: MaterialTheme.Light.Button.default.textAlign,
        letterSpacing: MaterialTheme.Light.Button.default.letterSpacing,
        cursor: MaterialTheme.Light.Button.default.cursor,
        transition: MaterialTheme.Light.Button.default.transition,
        backgroundColor: MaterialTheme.Light.Button.default.backgroundColor,
        color: MaterialTheme.Light.Button.default.color,
        paddingTop: MaterialTheme.Light.Button.default.paddingTop,
        paddingBottom: MaterialTheme.Light.Button.default.paddingBottom,
        paddingLeft: MaterialTheme.Light.Button.default.paddingLeft,
        paddingRight: MaterialTheme.Light.Button.default.paddingRight,
        marginTop: MaterialTheme.Light.Button.default.marginTop,
        marginBottom: MaterialTheme.Light.Button.default.marginBottom,
        marginLeft: MaterialTheme.Light.Button.default.marginLeft,
        marginRight: MaterialTheme.Light.Button.default.marginRight,
        textTransform: MaterialTheme.Light.Button.default.textTransform,
        boxShadow: MaterialTheme.Light.Button.default.boxShadow,
        borderRadius: MaterialTheme.Light.Button.default.borderRadius,
        onClick() {
            console.log("Unhandled button click");
        },
        // Some other efficient action can be used here like toast or something
        onDisableClick() {
            console.log("Unimplemented disabled state action, If one click on the button tell them what to do to enable the btn");
        },
        onMouseEnter(e) {

        },
        onMouseLeave(e) {

        },
        onMount(button) {

        }
    };

    static propTypes = {
        // Should be a component that takes in the text if any exists
        id: PropTypes.number,
        component: PropTypes.object,
        text: PropTypes.string,
        themeMode: PropTypes.oneOf(["Light", "Dark"]),
        theme: PropTypes.object,
        style: PropTypes.object,
        state: PropTypes.oneOf(["active", "default", "disabled", "link"]),
        onClick: PropTypes.func,
        onDisableClick: PropTypes.func,
        paddingTop: PropTypes.number,
        paddingBottom: PropTypes.number,
        paddingLeft: PropTypes.number,
        paddingRight: PropTypes.number,
        marginTop: PropTypes.number,
        marginBottom: PropTypes.number,
        marginLeft: PropTypes.number,
        marginRight: PropTypes.number,
        textTransform: PropTypes.oneOf(["uppercase", "lowercase"]),
        boxShadow: PropTypes.string,
        borderRadius: PropTypes.number
    };

    constructor(props) {
        super(props);

        this.style = {
            display: props.display,
            textDecoration: props.textDecoration,
            textAlign: props.textAlign,
            letterSpacing: props.letterSpacing,
            cursor: props.cursor,
            transition: props.transition,
            backgroundColor: props.backgroundColor,
            color: props.color,
            paddingTop: props.paddingTop,
            paddingBottom: props.paddingBottom,
            paddingLeft: props.paddingLeft,
            paddingRight: props.paddingRight,
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            marginLeft: props.marginLeft,
            marginRight: props.marginRight,
            textTransform: props.textTransform,
            boxShadow: props.boxShadow,
            borderRadius: props.borderRadius
        };
    }


    onClick(e) {
        this.props.onClick(e, this);
    }

    onMouseEnter(e) {
        this.props.onMouseEnter(e, this);
    }

    onMouseLeave(e) {
        this.props.onMouseLeave(e, this);
    }

    onMount(button) {
        this.props.onMount(this);
    }

    componentDidMount() {
        this.onMount(this);
    }

    render() {

        let {
            component,
            text
        } = this.props;


        if (component !== undefined) {
            // TODO use with props here
            // to create the required component
        }


        return (
            <span

                onClick={
                    e => {
                        this.onClick(e);
                    }
                }

                onMouseEnter={
                    e => {
                        this.onMouseEnter(e);
                    }
                }
                onMouseLeave={
                    e => {
                        this.onMouseLeave(e);
                    }
                }
                style={this.style}

                children={text}
            />

        );
    }

}