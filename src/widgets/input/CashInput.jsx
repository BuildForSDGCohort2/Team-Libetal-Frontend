import React, {Component} from "react";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import NumberFormatCustom from "./NumberFormatCustom";
import TextField from "@material-ui/core/TextField";

export default class CashInput extends Component {


    static propTypes = {
        fullWidth: PropTypes.bool,
        onChange: PropTypes.func,
        currency: PropTypes.shape({
            name: PropTypes.string,
            sign: PropTypes.string
        }),
        value: PropTypes.number
    };

    state = {
        value: ""
    };

    render() {
        const {inputRef, fullWidth, value, currency, onChange, label, ...props} = this.props;

        return (
            <TextField
                fullWidth={fullWidth}
                inputRef={inputRef}
                label={label}
                value={value}
                onChange={onChange}
                InputProps={{
                    inputComponent: NumberFormatCustom,
                    inputProps: {
                        currency: currency
                    }
                }}
                {...props}
            />
        );
    }
}