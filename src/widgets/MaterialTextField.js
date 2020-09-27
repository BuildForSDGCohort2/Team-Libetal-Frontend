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
        value: PropTypes.any,
        defaultRows: PropTypes.number,
        maxRows: PropTypes.number,
        helperText: PropTypes.any,
        InputLabelProps:PropTypes.any
    };

    static defaultProps = {
        color: "secondary",
        onClick(){

        }
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
            color,
            variant,
            onClick,
            InputProps,
            multiline,
            defaultRows,
            maxRows,
            label,
            placeholder,
            fullWidth,
            style = {},
            startIcon,
            children,
            onChange,
            helperText,
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
                    onClick={
                        e=>{
                            let propagate = onClick(e)

                            if(propagate|| propagate === undefined) e.stopPropagation()

                        }
                    }
                    helperText={helperText}
                    label={labelText}
                    select
                    multiline={multiline}
                    rows={defaultRows}
                    rowsMax={maxRows}
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
            color,
            helperText,
            variant,
            onClick,
            label,
            placeholder,
            fullWidth,
            onChange,
            multiline,
            defaultRows,
            maxRows,
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
                onClick={
                    e=>{
                        let propagate = onClick(e)

                        if(propagate|| propagate === undefined) e.stopPropagation()

                    }
                }
                helperText={helperText}
                label={label}
                placeholder={placeholder}
                fullWidth={fullWidth}
                style={style}
                multiline={multiline}
                rows={defaultRows}
                rowsMax={maxRows}
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
            color,
            variant,
            onClick,
            multiline,
            defaultRows,
            maxRows,
            helperText,
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
                rows={defaultRows}
                rowsMax={maxRows}
                ref={this.ref}
                onChange={this.performOnChange}
                color={color}
                variant={variant}
                helperText={helperText}
                onClick={
                    e=>{
                        let propagate = onClick(e)

                        if(propagate|| propagate === undefined) e.stopPropagation()

                    }
                }
                label={label}
                placeholder={placeholder}
                fullWidth={fullWidth}
                style={style}
                children={children}
                multiline={multiline}
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
            color,
            variant,
            helperText,
            onClick,
            label,
            placeholder,
            multiline,
            defaultRows,
            maxRows,
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
                onClick={
                    e=>{
                        let propagate = onClick(e)

                        if(propagate|| propagate === undefined) e.stopPropagation()

                    }
                }
                label={label}
                helperText={helperText}
                multiline={multiline}
                rows={defaultRows}
                rowsMax={maxRows}
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
            color,
            variant,
            onClick,
            label,
            placeholder,
            helperText,
            fullWidth,
            style,
            onChange,
            multiline,
            defaultRows,
            maxRows,
            startIcon,
            children,
            value,
            InputLabelProps,
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