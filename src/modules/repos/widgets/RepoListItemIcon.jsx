import React, {Component} from "react";
import MaterialIcon from "../../../widgets/MaterialIcon";
import PropTypes from "prop-types";

export default class RepoListItemIcon extends Component {

    static propTypes = {
        icon: PropTypes.string
    };

    render() {

        let {
            props: {
                icon,
                marginRight = 8,
                marginLeft = 0
            }
        } = this;
        return (
            <MaterialIcon
                icon={icon}
                style={{
                    marginRight
                }}
            />
        );
    }
}