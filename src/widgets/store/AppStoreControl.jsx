import React, {Component} from "react";
import MaterialIconButton from "../button/MaterialIconButton";
import Menu from "@material-ui/core/Menu";
import PropTypes from "prop-types";

export default class AppStoreControl extends Component {


    static propTypes = {
        navigator: PropTypes.func,
        componentInstance: PropTypes.any
    };

    get hasRef() {
        return this.ref !== undefined;
    }

    render() {

        const {
            navigator
        } = this.props;

        return (
            <>
                <MaterialIconButton icon={"Apps"}/>
                <Menu open={this.hasRef}>

                </Menu>
            </>
        );
    }
}