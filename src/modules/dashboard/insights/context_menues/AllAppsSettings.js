import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {IconButton} from "@material-ui/core";
import MaterialIcon from "../../../../widgets/MaterialIcon";
import MaterialIconBtn from "../../../../widgets/MaterialIconBtn";


export default class AllAppsSettings extends Component {

    state = {
        anchorEl : undefined
    };

    set anchorEl(value){
        this.setState({anchorEl:value})
    }

    constructor(props) {
        super(props);
        this.onMenuClose = this.onMenuClose.bind(this)
        this.openMenu = this.openMenu.bind(this)
    }


    openMenu(e){
        this.setState({anchorEl:e.currentTarget})
    }

    onMenuClose(){
        this.anchorEl = undefined
    }

    render() {

        let{
            anchorEl
        } = this.state

        return (
            <>

                <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={this.openMenu}
                    style={{padding:6}}>
                    <MaterialIcon icon={"Settings"} iconSize={20} iconPadding={6} />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.onMenuClose}
                >
                    <MenuItem onClick={this.onMenuClose}>Notifications</MenuItem>
                    <MenuItem onClick={this.onMenuClose}>Item 2</MenuItem>
                    <MenuItem onClick={this.onMenuClose}>Item 3</MenuItem>
                </Menu>
            </>
        );
    }
}