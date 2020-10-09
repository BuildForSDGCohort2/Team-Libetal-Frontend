import React, {Component} from "react";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/Inbox";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MaterialBtn from "../../../widgets/MaterialBtn";
import {ThemeProvider} from "@material-ui/styles";
import Register from "./Register";
import MaterialIcon from "../../../widgets/MaterialIcon";


export default class RegisterDrawer extends Component {


    props = {
        registerUser() {
            console.log("Registering User");
        },
        success: {},
        switchForm(currentForm) {
            // Throw required property
        },
        toggleDrawer() {
            console.log("Closing drawer");
        },
        open: false
    };


    state = {
        drawerState: false
    };

    constructor(props) {
        super(props);

        this.onDrawerItemClick = this.onDrawerItemClick.bind(this);

    }


    onDrawerItemClick(form) {
        this.props.toggleDrawer();
        if (this.props.open) {
            this.props.switchForm(form);
            this.props.toggleDrawer();
        }
    }


    render() {

        let {open, classes, toggleDrawer, switchForm, registerUser, success} = this.props;

        return (
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}>
                <Grid style={{height: 80}}/>
                <Divider/>
                <List>
                    <ListItem onClick={toggleDrawer} button key={"profile"}>
                        <ListItemIcon><MaterialIcon icon={"PersonAdd"}/></ListItemIcon>
                        <ListItemText
                            onClick={() => this.onDrawerItemClick(Register.PROFILE_FORM)}
                            primary={"Profile"}/>
                    </ListItem>
                    <ListItem onClick={toggleDrawer} button key={"accounts_skill"}>
                        <ListItemIcon><MaterialIcon icon={"AccountBalanceWallet"}/></ListItemIcon>
                        <ListItemText
                            onClick={() => this.onDrawerItemClick(Register.QUALIFICATIONS_FORM)}
                            secondary={"Qualifications/Payments"}
                            primary={"Other information"}/>
                    </ListItem>
                    {/* <ListItem
                        onClick={toggleDrawer}
                        button
                        key={"payment"}>
                        <ListItemIcon><InboxIcon/></ListItemIcon>
                        <ListItemText
                            onClick={() => this.onDrawerItemClick(Register.ACCOUNTS_FORM)}
                            primary={"Payments"}/>
                    </ListItem>*/}
                </List>
                <Divider/>
                <List>
                    <ListItem
                        onClick={toggleDrawer}
                        button
                        key={"accessibility"}>
                        <ListItemIcon><MaterialIcon icon={"AccessibilityOutlined"}/></ListItemIcon>
                        <ListItemText
                            onClick={() => this.onDrawerItemClick(Register.ACCESSIBILITY_FORM)}
                            primary={"Accessibility"}/>
                    </ListItem>
                </List>
                <div className={classes.grow}/>
                <List>
                    <ListItem onClick={toggleDrawer} button key={"accessibility"}>
                        <ListItemIcon><CheckCircleIcon/></ListItemIcon>
                        <ListItemText primary={
                            <ThemeProvider theme={success}>
                                <MaterialBtn
                                    color={"primary"}
                                    onClick={registerUser}
                                    variant={"contained"}
                                    content={"Register"}/>
                            </ThemeProvider>
                        }/>
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}
