import React, {Component} from "react";
import MaterialTheme from "../theming/MaterialTheme";
import PropTypes from "prop-types";

export default class MaterialCard extends Component {

    state = {
        style: {}
    };

    static propTypes = {
        variant: PropTypes.oneOf(["default", "reveal"]),
        display: PropTypes.string,
        paddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        paddingBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        paddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        cursor: PropTypes.string,
        boxShadow: PropTypes.string,
        minHeight: PropTypes.number,
        minWidth: PropTypes.number,
        borderRadius: PropTypes.string,
        theme:PropTypes.object
    };

    static defaultProps = {
        variant: "default" || "reveal",
        display: MaterialTheme.Light.Card.default.display,
        paddingTop: MaterialTheme.Light.Card.default.paddingTop,
        paddingBottom: MaterialTheme.Light.Card.default.paddingBottom,
        paddingLeft: MaterialTheme.Light.Card.default.paddingLeft,
        paddingRight: MaterialTheme.Light.Card.default.paddingRight,
        borderRadius: MaterialTheme.Light.Card.default.borderRadius,
        cursor: MaterialTheme.Light.Card.default.cursor,
        boxShadow: MaterialTheme.Light.Card.default.boxShadow,
        minHeight: MaterialTheme.Light.Card.default.minHeight,
        minWidth: MaterialTheme.Light.Card.default.minWidth,
        backgroundColor: MaterialTheme.Light.Card.default.backgroundColor,
        theme:{
            default: {},
            get mouseEnter() {
                console.log(this)
                if (this.mouseEnterField === undefined) {
                    this.mouseEnterField = {
                        ...this.default,
                        boxShadow: MaterialTheme.Style.Box.shadow(2, 2, 2)
                    };
                }

                return this.mouseEnterField;
            },
            get mouseLeave() {
                return this.default;
            }
        },
    };


    constructor(props) {
        super(props);

        this.state.style = this.props.theme.default;
    }


    onMouseEnter(e) {
        // this.setState({style: this.props.theme.mouseEnter});

        console.log(this.props.theme)
    }

    onMouseLeave(e) {
        this.setState({style: this.props.theme.mouseLeave});
    }

    onClick(e) {

    }

    render() {

        return (
            <div
                onMouseLeave={
                    e => {
                        this.onMouseLeave(e);
                    }
                }
                onMouseEnter={
                    e => this.onMouseEnter(e)
                }
                onClick={
                    e => {
                        this.onClick(e);
                    }
                }

                style={this.state.style}
                children={this.props.children}
            />
        );
    }
}
