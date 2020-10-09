import React, {Component} from "react";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

export default class NumberFormatCustom extends Component {


    static propTypes = {
        inputRef: PropTypes.any,
        currency: PropTypes.shape({
            name: PropTypes.string,
            sign: PropTypes.string
        })
    };

    static defaultProps = {
        onChange(e) {
            console.log(`Unhandled NumberFormatCustom change`);
        },
        currency: {
            name: "K.Shilling",
            sign: "Ksh"
        }
    };

    render() {

        const {inputRef, onChange, currency, ...props} = this.props;

        return (
            <NumberFormat
                {...props}
                getInputRef={inputRef}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value
                        }
                    });
                }}
                thousandSeparator
                isNumericString
                prefix={`${currency.sign} `}
            />
        );
    }
}