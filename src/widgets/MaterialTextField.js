import React, {Component} from "react";
import FormControl from "@material-ui/core/FormControl";
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import PropTypes from "prop-types";

export default class MaterialTextField extends Component {


    static propTypes = {
        labelText: PropTypes.string,
        labelId: PropTypes.string,
        color: PropTypes.string,
        variant: PropTypes.string,
        onClick: PropTypes.func,
        InputProps: PropTypes.object,
        label: PropTypes.any,
        placeholder: PropTypes.string,
        fullWidth: PropTypes.bool,
        style: PropTypes.object,
        startIcon: PropTypes.any,
        onChange: PropTypes.func,
        value: PropTypes.any
    };

    static defaultProps = {
        color: "secondary"
    };

    constructor(props) {
        super(props);

        this.onChange = props.onChange;
        this.performOnChange = this.performOnChange.bind(this);
    }

    performOnChange(e) {
        if (this.onChange !== undefined) this.onChange(e);
        console.log("Unhandled input change");
    }


    get selectInputWithLabel() {
        let {
            labelText,
            labelId,
            color = "secondary",
            variant,
            onClick,
            InputProps,
            label,
            placeholder,
            fullWidth,
            style = {},
            startIcon,
            children,
            onChange,
            value,
            ...props
        } = this.props;

        return (
            <>
                {/* <InputLabel shrink id={labelId}>{labelText}</InputLabel>*/}
                <TextField
                    onChange={this.performOnChange}
                    color={color}
                    variant={variant}
                    onClick={onClick}
                    label={labelText}
                    select
                    placeholder={placeholder}
                    fullWidth={fullWidth}
                    style={style}
                    startIcon={startIcon}
                    children={children}
                    value={value}
                    {...props}
                />
            </>
        );
    }

    get selectInputBasic() {
        let {

            labelText,
            labelId,
            color = "secondary",
            variant,
            onClick,
            label,
            placeholder,
            fullWidth,
            onChange,
            style = {},
            startIcon,
            InputProps,
            children,
            value,
            ...props
        } = this.props;

        return (
            <TextField
                color={color}
                variant={variant}
                onClick={onClick}
                label={label}
                placeholder={placeholder}
                fullWidth={fullWidth}
                style={style}
                startIcon={startIcon}
                children={children}
                value={value}
                onChange={this.performOnChange}
                {...props}
            />
        );
    }

    get selectInput() {
        return this.props.labelText ? this.selectInputWithLabel : this.selectInputBasic;
    }

    get textInputWithStartIcon() {

        let {
            labelText,
            labelId,
            color = "secondary",
            variant,
            onClick,
            label,
            placeholder,
            fullWidth,
            style = {},
            startIcon,
            children,
            InputProps,
            value,
            onChange,
            ...props
        } = this.props;


        return (
            <TextField
                ref={this.ref}
                onChange={this.performOnChange}
                color={color}
                variant={variant}
                onClick={onClick}
                label={label}
                placeholder={placeholder}
                fullWidth={fullWidth}
                style={style}
                children={children}
                value={value}
                {...props}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {startIcon}
                        </InputAdornment>
                    )
                }}
            />
        );
    }

    get textInputBasic() {
        let {
            labelText,
            labelId,
            color = "secondary",
            variant,
            onClick,
            label,
            placeholder,
            fullWidth,
            style = {},
            startIcon,
            children,
            value,
            onChange,
            ...props
        } = this.props;

        return (
            <TextField
                onChange={this.performOnChange}
                color={color}
                variant={variant}
                onClick={onClick}
                label={label}
                placeholder={placeholder}
                fullWidth={fullWidth}
                style={style}
                //startIcon={startIcon}
                children={children}
                value={value}
                {...props}
            />
        );
    }

    get textInput() {
        return this.props.startIcon === undefined ? this.textInputBasic : this.textInputWithStartIcon;
    }


    get input() {
        return this.props.select ? this.selectInput : this.textInput;
    }

    render() {
        let {
            labelText,
            labelId,
            color = "secondary",
            variant,
            onClick,
            label,
            placeholder,
            fullWidth,
            style,
            onChange,
            startIcon,
            children,
            value,
            InputProps,
            ...props
        } = this.props;


        this.onChange = onChange;

        return (
            <FormControl {...props} fullWidth={fullWidth}>
                {this.input}
            </FormControl>
        );
    }

}