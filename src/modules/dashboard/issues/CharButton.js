import React, {Component} from "react";
import MaterialBtn from "../../../widgets/MaterialBtn";
import PropTypes from "prop-types";

export default class CharButton extends Component {


    static style = {
        minWidth: 26,
        minHeight: 26,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 8,
        paddingRight: 8
    };


    static propTypes = {
        char: PropTypes.string,
        charColor: PropTypes.string,
        buttonColor: PropTypes.string
    };

    render() {
        let {
            char,
            charColor,
            buttonColor
        } = this.props;

        return (
            <MaterialBtn
                content={char}
                color={buttonColor}
                textColor={charColor}
                style={CharButton.style}/>
        );
    }

}