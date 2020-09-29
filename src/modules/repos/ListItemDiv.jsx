import React, {Component} from "react";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";

export default class ListItemDiv extends Component {

    static propTypes = {
        component: PropTypes.any,
        alignItems: PropTypes.oneOf(["center", "flex-start"])
    };

    render() {
        let {
            alignItems,
            component,
            ...props
        } = this.props;

        return (
            <ListItem
                component={"div"}
                {...props}
                alignItems={alignItems}
            />
        );
    }

}