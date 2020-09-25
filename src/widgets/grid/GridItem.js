import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";

export default class GridItem extends Component {


    render() {
        let {
            flexGrow,
            style:{...style}  = {},
            ...props
        } = this.props;


        style.flexGrow = flexGrow || style.flexGrow
        return (
            <Grid
                style={style}
                item
                {...props}/>
        );
    }
}