import React, {Component} from "react";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";

export default class ListItemDiv extends Component {

    static propTypes = {
        component: PropTypes.any,
        alignItems: PropTypes.oneOf(["center", "flex-start"]),
        disableGutters: PropTypes.bool,
        button: PropTypes.bool,
    };

    render() {
        let {
            alignItems,
            component,
            disableGutters,
            ...props
        } = this.props;

        return (
            <ListItem
                disableGutters={disableGutters}
                component={"div"}
                alignItems={alignItems}
                {...props}
            />
        );
    }

}