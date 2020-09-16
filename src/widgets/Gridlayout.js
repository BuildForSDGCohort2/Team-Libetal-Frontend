import Grid from "@material-ui/core/Grid";
import React from "react";

export default class GridLayout extends React.Component {


    render() {

        let {container, ...props} = this.props;
        return (
            <Grid container {...props}/>
        );
    }
}