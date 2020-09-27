import React, {Component} from "react";
import MaterialImage from "../../widgets/MaterialImage";
import PropTypes from "prop-types";

export default class HomeImageButton extends Component {

    static propTypes = {
        navigator: PropTypes.func
    };

    render() {
        return (
            <MaterialImage
                onClick={
                    e => {
                        this.props.navigator("home");
                    }
                }
                src={"/images/logo.png"}
            />
        );
    }

}