import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";


/**
 * Displays Items in a row
 * */
export default class Row extends Component {

    props = {
        justify: "center"
    };

    render() {

        let {direction, container, ...props} = this.props;

        return (
            <Grid container direction={"row"} {...props}/>
        );
    }
}