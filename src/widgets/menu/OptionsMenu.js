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
    menuItems: PropTypes.arrayOf(
        PropTypes.shape(
            {
                itemId: PropTypes.number,
                title: PropTypes.any
            }
        )
    ).isRequired

};
export default class OptionsMenu extends Component {


    state = {
        anchorEl: undefined
    };

    static defaultProps = {
        onMenuItemClick(itemId, e) {
            console.log(`Unhandled menu item click ${itemId}`);
        },
        menuItems:[]
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
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    open(e) {
        this.setState({anchorEl: e.currentTarget}, () => {
            let {
                onMenuOpen
            } = this.props;
            if (onMenuOpen !== undefined) {
                onMenuOpen(this);
            }
        });

    }

    close() {
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
        return this.props.menuItems.map(({itemId, title, key, id},i) => {

            let menuItemId;

            // Secure id assignment
            if (menuItemId === undefined && key !== undefined) menuItemId = key;
            if (menuItemId === undefined && itemId !== undefined) menuItemId = itemId;
            if (menuItemId === undefined && id !== undefined) menuItemId = id;

            return (
                <MenuItem
                    id={id}
                    onClick={
                        (e) => {
                            this.props.onMenuItemClick(menuItemId, this, e);
                        }
                    }

                    children={title}
                />
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
                    style={{marginTop: 40}}
                    // when an anchor element exists show the menu
                    open={Boolean(anchorEl)}
                    onClose={this.close}
                    children={this.menuItems}
                />
            </>
        );
    }
}