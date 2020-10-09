import React, {Component} from "react";
import MaskedInput from "react-text-mask";
import PropTypes from "react";

export default class MaterialFormattedTextFieldBase extends Component {

    static propTypes = {
        mask: PropTypes.array,
        showMask: PropTypes.bool,
        placeholderChar: PropTypes.string
    };

    static defaultProps = {
        mask: ["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
        showMask: true,
        placeholderChar: "\u2000"
    };

    render() {
        const {inputRef, placeholderChar, ...props} = this.props;

        return (
            <MaskedInput
                ref={
                    (ref) => {
                        inputRef(ref ? ref.inputElement : null);
                    }
                }
                placeholderChar={placeholderChar}
                {...props}
            />
        );
    }
}