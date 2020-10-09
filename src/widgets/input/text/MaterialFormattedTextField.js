import MaterialFormattedTextFieldBase from "./MaterialFormattedTextFieldBase";
import Input from "@material-ui/core/Input";
import React, {Component} from "react";
import PropTypes from "prop-types";
import InputBase from "@material-ui/core/InputBase";
import MaterialTextField from "../../MaterialTextField";
import TextField from "@material-ui/core/TextField";

export default class MaterialFormattedTextField extends Component {

    state = {
        value: undefined
    };

    static propTypes = {
        onChange: PropTypes.func,
        placeholder: PropTypes.string
    };

    static defaultProps = {
        onChange(newValue, e) {
            console.log(`Unhandled change on ${this} newValue = ${newValue}`);
        }
    };

    constructor(props) {
        super(props);
        this.bindEvents();
    }

    bindEvents() {
        this.onChange = this.onChange.bind(this);
    }

    onChange(e = {}) {
        let {target = {}} = e;
        this.setState(
            {value: target.value},
            () => {
                this.props.onChange(target.value, e);
            }
        );
    }

    get mask() {
        if (this.maskField === undefined) this.maskField = [/\d/, /\d/, /\d/];

        return this.maskField;
    }

    render() {
        let {inputProps, placeholder, formatterProps, InputProps, InputLabelProps, ...props} = this.props;

        formatterProps = formatterProps || inputProps || {};
        formatterProps.mask = this.mask;
        formatterProps.placeholderChar = "*";

        return (
            <TextField
                {...props}
                color={"secondary"}
                value={this.state.value}
                onChange={this.onChange}
                InputProps={{
                    ...InputProps,
                    inputProps: formatterProps,
                    inputComponent: MaterialFormattedTextFieldBase
                }}
                InputLabelProps={{
                    ...InputLabelProps,
                    shink: false
                }}
            />
        );
    }
}