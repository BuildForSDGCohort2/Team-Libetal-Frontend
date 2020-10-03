import React, {Component} from "react";
import MaterialIcon from "../../../widgets/MaterialIcon";
import PropTypes from "prop-types";

export default class RepoListItemIcon extends Component {

    static propTypes = {
        icon: PropTypes.string,
        color: PropTypes.string,
        marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    render() {

        let {
            props: {
                icon,
                marginRight = 8,
                marginLeft = 0,
                color,
                ...props
            }
        } = this;
        return (
            <MaterialIcon
                icon={icon}
                style={{
                    marginRight
                }}
                color={color}
                {...props}
            />
        );
    }
}