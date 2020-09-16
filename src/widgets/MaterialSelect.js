import React, {Component} from "react";
import Select from "@material-ui/core/Select";
import {FormControl} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";


export default class MaterialSelect extends Component {


    props = {
        style: {},
        selectionItems: [],
        selectionHeader: {},
        selectionFooter: {}
    };


    get selectionItems() {
        let {selectionItems, children} = this.props;

        if (this.selectionItemsField === undefined) {
            this.selectionItemsField = selectionItems === undefined ? children : selectionItems.map(({key, value}) => {

                return (
                    <MenuItem key={key} value={key}>{value}</MenuItem>
                );
            });
        }

        return this.selectionItemsField;
    }

    get basicInput() {

        let {
            selectionItems,
            labelId,
            labelText,
            label,
            children: items,
            selectionHeader,
            selectionFooter,
            ...props
        } = this.props;


        return (
            <Select {...props}>
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
            labelId,
            labelText,
            label,
            children,
            selectionHeader,
            selectionFooter,

            ...props
        } = this.props;

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
            selectionItems = this.selectionItems,
            renderValue,
            labelText,
            materialLabel,
            menuTitleText,
            labelId,
            style = {},
            children,
            selectionHeader,
            selectionFooter,
            ...props
        } = this.props;

        return (
            <FormControl {...props} >
                {this.input}
            </FormControl>
        );
    }
}