import React from "react";
import MaterialDrawerListItem from "./MaterialDrawerListItem";
import {Collapse, ListItem, ListItemIcon} from "@material-ui/core";
import PropTypes from "prop-types";
import MaterialDrawerList from "./MaterialDrawerList";
import MaterialIconBtn from "../MaterialIconBtn";
import ListItemText from "@material-ui/core/ListItemText";

export default class MaterialDrawerListItemCollapsable extends MaterialDrawerListItem {


    state = {
        isCollapsed: false
    };

    static propTypes = {
        ...MaterialDrawerListItem.propTypes
    };
    static defaultProps = {
        timeout: "auto",
        onClick(itemId) {
            console.log(`Unhandled drawer item click item=${itemId}`);
        },
        items: PropTypes.arrayOf(PropTypes.any)
    };

    get item() {

        let {
            isCollapsed,
            timeout
        } = this.state;

        return (
            <>
                // TODO: this should not have a viable key id as it's just for collapsing
                {super.item}
                <Collapse in={isCollapsed} timeout={timeout}>
                    <MaterialDrawerList items={this.props.items} onItemClick={this.props.onItemClick}/>
                </Collapse>
            </>
        );
    }
}