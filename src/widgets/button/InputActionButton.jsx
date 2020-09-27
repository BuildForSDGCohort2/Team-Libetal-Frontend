import React, {Component} from "react";
import MaterialBtn from "../MaterialBtn";
import PropTypes from "prop-types";

/**@Description
 * The base of this class is to be linked to an input
 * and when clicked the action is taken in relation to the
 * said input
 * i.e of click of a search InputIconButton the search action
 * is executed
 * */
export default class InputActionButton extends Component {


    static propTypes = {
        input: PropTypes.any
    };

    render() {
        return (
            <MaterialBtn>

            </MaterialBtn>
        );
    }
}

