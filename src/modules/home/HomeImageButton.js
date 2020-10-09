import React, {Component} from "react";
import MaterialImage from "../../widgets/MaterialImage";
import PropTypes from "prop-types";
import Libetal from "../../widgets/icons/Libetal";
import Colors from "../../Colors";

export default class HomeImageButton extends Component {

    static propTypes = {
        navigator: PropTypes.func.isRequired
    };

    render() {

        return (
            <Libetal
                height={32}
                width={32}
                iColor={Colors.red}
                bColor={Colors.white}
                lColor={Colors.blue}
                onClick={
                    e => {
                        this.props.navigator("home");
                    }
                }
            />

        );
    }

}