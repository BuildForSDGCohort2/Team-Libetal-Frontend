import React, {Component} from "react";
import Select from "@material-ui/core/Select";
import {FormControl} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import PropTypes from "prop-types";
import InputAdornment from "@material-ui/core/InputAdornment";
import MaterialIcon from "../MaterialIcon";

/**
 * ID does not work as expected
 * */
export default class MaterialSelect extends Component {


    static defaultProps = {
        color: "secondary",
        style: {},
        selectionItems: [],
        selectionHeader: undefined,
        selectionFooter: undefined,
        value: "",
        onChange(item) {
            console.log(`Unhandled item select change`);
        },
        renderValue: undefined
    };

    static propTypes = {
        color: PropTypes.string,
        selectionItems: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.number,
            value: PropTypes.any
        })),
        selectionHeader: PropTypes.any,
        selectionFooter: PropTypes.any,
        labelId: PropTypes.string,
        id: PropTypes.string,
        value: PropTypes.any,
        onChange: PropTypes.func,
        renderValue: PropTypes.any,
        labelText: PropTypes.string,
        startAdornment: PropTypes.any,
        multiple: PropTypes.bool
    };

    get selectionItems() {
        let {selectionItems, children} = this.props;

        this.selectionItemsField = selectionItems === undefined ? children : selectionItems.map(({key, value}) => {

            return (
                <MenuItem key={key} value={key}>{value}</MenuItem>
            );
        });


        return this.selectionItemsField;
    }

    get basicInput() {

        let {
            selectionItems,
            labelId,
            labelText,
            label,
            startIcon,
            children: items,
            selectionHeader,
            selectionFooter,
            style: {marginTop, ...style} = {},
            ...props
        } = this.props;

        style.marginTop = 0;


        if (startIcon !== undefined) {

            if (typeof startIcon === "string") {
                startIcon = <MaterialIcon icon={startIcon}/>;
            }

            props.startAdornment = (
                <InputAdornment position="start">
                    {startIcon}
                </InputAdornment>
            );
        }

        return (
            <Select style={style} {...props}>
                {selectionHeader}
                {this.selectionItems}
                {selectionFooter}
            </Select>
        );
    }


    get input() {
        return this.props.labelId === undefined ? this.basicInput : this.withLabel;
    }

    get withLabel() {
        let {
            selectionItems,
            labelId,
            labelText,
            label,
            children,
            startIcon,
            selectionHeader,
            selectionFooter,
            ...props
        } = this.props;

        if (startIcon !== undefined) {

            if (typeof startIcon === "string") {
                startIcon = <MaterialIcon icon={startIcon}/>;
            }

            props.startAdornment = (
                <InputAdornment position="start">
                    {startIcon}
                </InputAdornment>
            );
        }

        return (
            <>
                <InputLabel shrink id={labelId}>{labelText}</InputLabel>
                <Select {...props}>
                    {selectionHeader}
                    {this.selectionItems}
                    {selectionFooter}
                </Select>
            </>
        );
    }


    render() {
        /*Prepares required defaultValue*/
        let {
            color,
            selectionItems = this.selectionItems,
            renderValue,
            labelText,
            materialLabel,
            menuTitleText,
            labelId,
            startIcon,
            startAdornment,
            style,
            children,
            selectionHeader,
            selectionFooter,
            ...props
        } = this.props;

        // variant={"outlined"}  not logical too big a button that isn't stylable from here
        return (
            <FormControl {...props} >
                {this.input}
            </FormControl>
        );
    }
}