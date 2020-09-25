import React, {Component} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Inbox as InboxIcon} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

export default class DrawerItem extends Component {


    get collapsable() {
        return (
            <>

            </>
        );
    }

    render() {
        return (
            <>
                {this.items}
            </>
        );
    }
}