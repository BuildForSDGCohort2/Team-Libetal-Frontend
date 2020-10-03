import React, {Component} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Inbox as InboxIcon, StarBorder} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";

export default class DrawerItemCollapsable extends Component {


    state = {
        open: false
    };

    render() {

        let {
            open
        } = this.state;

        return (
            <>
                <ListItem button onClick={() => {
                    // TODO: creat link handler
                }}>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Inbox"/>
                    {/*TODO: End Icon  {open ? <ExpandLess/> : <ExpandMore/>}*/}
                </ListItem>
                <Collapse in={open} timeout={"auto"} unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button>
                            <ListItemIcon>
                                <StarBorder/>
                            </ListItemIcon>
                            <ListItemText primary="Starred"/>
                        </ListItem>
                    </List>
                </Collapse>
            </>
        );
    }
}