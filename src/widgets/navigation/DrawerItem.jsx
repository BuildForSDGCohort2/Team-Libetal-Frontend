import React, {Component} from "react";

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