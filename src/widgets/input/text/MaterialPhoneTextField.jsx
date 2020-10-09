import React, {Component} from "react";
import {TextField} from "@material-ui/core";
import NumberFormatCustom from "../NumberFormatCustom";
import PropTypes from "prop-types";
import MaterialFormattedTextFieldBase from "./MaterialFormattedTextFieldBase";
import Input from "@material-ui/core/Input";

export default class MaterialPhoneTextField extends Component {

    static propTypes = {
        fullWidth: PropTypes.bool,
        showMask: PropTypes.bool,
        inputRef: PropTypes.any,
        label: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.any
    };

    static defaultProps = {
        onChange(newValue) {
            console.log(`Unhandled change in MaterialPhoneTextField ${newValue}`);
        },
        label: "Phone"
    };


    state = {
        value: `(+254)    -   -   `
    };

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.bindEvents();
    }

    bindEvents() {
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let {target = {}} = e;
        this.setState(
            {value: target.value},
            (e) => {
                this.props.onChange(target.value, e);
            }
        );
    }

    render() {

        const {fullWidth, showMask, onChange, InputProps, inputRef, label, value, ...props} = this.props;

        return (
            <TextField
                inputRef={this.ref}
                label={label}
                value={this.state.value}
                onChange={this.onChange}
                fullWidth={fullWidth}
                InputProps={{
                    ...InputProps,
                    inputComponent: MaterialFormattedTextFieldBase,
                    inputProps: {
                        mask: ["(", "+", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/],
                        showMask,
                        ref: this.ref,
                        placeholderChar: "*"
                    }
                }}
                {...props}
            />

        );
    }
}