import React, {Component} from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MaterialIcon from "../../../../widgets/MaterialIcon";
import MenuItem from "@material-ui/core/MenuItem";
import Colors from "../../../../Colors";

export default class EarningsMenu extends Component {


    state ={
        anchorEl:undefined
    }

    constructor(props) {
        super(props);
        this.bindEvents();
    }

    bindEvents() {
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    openMenu(e) {
        this.setState({anchorEl:e.currentTarget})
    }

    closeMenu(){
        this.setState({anchorEl:undefined})
    }

    render() {

        let {
            anchorEl
        } = this.state;

        return (
            <>
                <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={this.openMenu}
                    style={{padding: 6}}>
                    <MaterialIcon icon={"MoreVert"} iconSize={24} iconPadding={6} color={Colors.white}/>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.onMenuClose}
                >
                    <MenuItem onClick={this.closeMenu}>Enable Notifications</MenuItem>
                    <MenuItem onClick={this.closeMenu}>View More</MenuItem>
                </Menu>
            </>
        );
    }
}