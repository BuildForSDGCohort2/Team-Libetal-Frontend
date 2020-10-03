import React, {Component} from "react";
import PropTypes from "prop-types";
import Flex from "./Flex";
import Colors from "../Colors";
import Paper from "@material-ui/core/Paper";

export default class MDrawer extends Component {

    state = {
        isOpen: true
    };

    static propTypes = {
        theme: PropTypes.func,
        justify: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_AROUND, Flex.SPACE_BETWEEN, Flex.SPACE_EVENLY, Flex.STRETCH]),
        alignItems: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_AROUND, Flex.SPACE_BETWEEN, Flex.SPACE_EVENLY, Flex.STRETCH]),
        alignContent: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_AROUND, Flex.SPACE_BETWEEN, Flex.SPACE_EVENLY, Flex.STRETCH]),
        spacing: PropTypes.number,
        backgroundColor: PropTypes.string,
        paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingLR: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        paddingTB: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        variant: PropTypes.oneOf(["permanent", "persistent", "temporary"]),
        screenOrientation: PropTypes.oneOf(["left-right", "right-left"]),
        zIndex: PropTypes.number,
        style: PropTypes.object
    };

    static defaultProps = {
        variant: "permanent",
        style: {
            backgroundColor: Colors.orange,
            maxWidth: 1000,
            width: "300px !important",
            zIndex: 1200
        }

    };


    get openStyle() {
        if (this.closedStyleField === undefined) {

            let {
                style
            } = this.props;

            this.closedStyleField = {
                ...style,
                [this.hideDirection]: 0
            }
        }

        return this.closedStyleField;
    }

    get hideDirection() {
        if (this.props.screenOrientation === "left-right") {
            return "marginLeft"
        }

        return "marginRight";
    }

    get closedStyle() {

        if (this.closedStyleField === undefined) {

            let {
                style
            } = this.props;

            this.closedStyleField = {
                ...style,
                [this.hideDirection]: -(style.width || style.minWidth)
            }
        }

        return this.closedStyleField;
    }

    get style() {
        if (this.state.isOpen) {
            return this.openStyle
        } else {
            return this.closedStyle
        }
    }


    componentDidMount() {

        let {
            props: {
                defaultIsOpen,

            },
            state: {
                isOpen
            }
        } = this;

        this.setState(state => {

            state.isOpen = defaultIsOpen;

            return state;
        })
    }

    render() {

        let {
            props: {
                variant,
                style
            },
            state: {
                isOpen
            }
        } = this;


        return (
            <Paper
                variant={variant}
                style={style}
            >
                {this.props.children}
            </Paper>
        );
    }
}