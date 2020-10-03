import React, {Component} from "react";
import MaterialImage from "../../widgets/MaterialImage";
import PropTypes from "prop-types";
import Libetal from "../../widgets/icons/Libetal";
import Colors from "../../Colors";

export default class HomeImageButton extends Component {

    static propTypes = {
        navigator: PropTypes.func
    };

    render() {

        let old = (
            <MaterialImage

                height={80}
                width={80}
                src={"/images/logo.png"}
            />
        );
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