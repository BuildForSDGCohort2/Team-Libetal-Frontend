import React, {Component} from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";

export const OptionsMenuPropsTypes = {
    onClick: PropTypes.func,
    id: PropTypes.string.isRequired,
    onMenuOpen: PropTypes.func,
    onMenuClose: PropTypes.func,
    onMenuItemClick: PropTypes.func,
    menuItems:PropTypes.arrayOf(PropTypes.shape({
        key:PropTypes.number,
        title:PropTypes.string
    })).isRequired

};
export default class OptionsMenu extends Component {


    state = {
        anchorEl: undefined
    };

    static defaultProps = {
        onMenuItemClick(itemId, e) {
            console.log(`Unhandled menu item click ${itemId}`);
        }
    };

    static propTypes = OptionsMenuPropsTypes;

    constructor(props) {
        super(props);
        this.bindEvents();
    }

    get controller() {
        throw Error(`Cann not initialize abstract class controller`);
    }

    bindEvents() {
        this.closeMenu = this.closeMenu.bind(this);
        this.openMenu = this.openMenu.bind(this);
    }

    openMenu(e) {
        this.setState({anchorEl: e.currentTarget}, () => {
            let {
                onMenuOpen
            } = this.props;
            if (onMenuOpen !== undefined) {
                onMenuOpen(this);
            }
        });

    }

    closeMenu() {
        this.setState({anchorEl: undefined}, () => {
            let {
                onMenuClose
            } = this.props;
            if (onMenuClose !== undefined) {
                onMenuClose(this);
            }
        });
    }

    /**
     * <MenuItem onClick={this.onMenuClose}>Item 2</MenuItem>
     * */
    get menuItems() {
        return this.props.menuItems.map(({id, title}) => {

            return (
                <MenuItem
                    onClick={
                        (e) => {
                            this.props.onMenuItemClick(id, e);
                        }
                    }>
                    {title}
                </MenuItem>
            );
        });
    }

    render() {

        let {
            anchorEl
        } = this.state;

        let {
            id
        } = this.props;

        return (
            <>
                {this.controller}
                <Menu
                    id={id}
                    anchorEl={anchorEl}
                    keepMounted
                    style={{marginTop:40}}
                    // when an anchor element exists show the menu
                    open={Boolean(anchorEl)}
                    onClose={this.closeMenu}
                    children={this.menuItems}
                />
            </>
        );
    }
}