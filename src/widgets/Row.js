import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";


/**
 * Displays Items in a row
 * */
export default class Row extends Component {

    static propTypes = {
        justify: PropTypes.string
    };

    static END = "flex-end";
    static START = "flex-start";

    static JUSTIFY = {
        SPACE_AROUND: "space-around",
        SPACE_BETWEEN: "space-between",
        SPACE_EVENLY: "space-evenly",
        START: "flex-start",
        END: "flex-end",
        CENTER: "center"
    };


    constructor(props) {
        super(props);

    }

    render() {

        let {direction, container, ...props} = this.props;

        return (
            <Grid container direction={"row"} {...props}/>
        );
    }
}