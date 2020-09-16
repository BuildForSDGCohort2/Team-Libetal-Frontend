import React from "react";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Inbox as InboxIcon, Mail as MailIcon} from "@material-ui/icons";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";

export default class AccountsDrawer extends React.Component {

    props = {
        drawerState: true,
        classes: {},
        toggleDrawer: () => {
            console.log("Should pass drawer toggleTo AccountsDrawer");
        }
    };

    static defaultProps = {
        drawerState: true
    };

    render() {

        let {classes, drawerState, toggleDrawer} = this.props;

        return (
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: drawerState,
                    [classes.drawerClose]: !drawerState
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: drawerState,
                        [classes.drawerClose]: !drawerState
                    })
                }}>
                <Divider style={{marginTop: 64}}/>

                <List>
                    {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        );
    }
}