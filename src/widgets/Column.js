import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";

export default class Column extends Component {

    render() {
        let {direction, reverse = false, ...props} = this.props;

        direction = reverse ? "column-reverse" : "column";

        return (
            <Grid item  {...props}/>
        );
    }
}