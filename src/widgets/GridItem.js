import React from "react";
import {Grid} from "@material-ui/core";

export default class GridItem extends React.Component {


    props = {
        small: 1,
        medium: 1,
        large: 1
    };

    constructor({small, medium, large, direction, container, ...props}) {
        super(props);
    }


    render() {

        let {small = 12, medium = 12, large = 12, item, direction, container, ...props} = this.props;

        return (
            <Grid item {...props}/>
        );
    }
}