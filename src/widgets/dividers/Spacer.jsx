import React, {Component} from "react";
import MaterialDivider from "../MaterialDivider";
import Colors from "../../Colors";
import PropTypes from "prop-types";

export default class Spacer extends Component {

    static propTypes = {
        spacing: PropTypes.number,
        orientation: PropTypes.string
    };

    static VERTICAL = MaterialDivider.VERTICAL;
    static HORIZONTAL = MaterialDivider.HORIZONTAL;

    render() {
        const {
            spacing,
            orientation,
            height,
            width,
            ...props
        } = this.props;

        if (orientation === Spacer.VERTICAL) {
            props.width = spacing;
        } else props.width = spacing;

        props.spacing = 0;

        return (
            <MaterialDivider
                orientation={orientation}
                color={Colors.transparent}
                {...props}
            />
        );
    }
}