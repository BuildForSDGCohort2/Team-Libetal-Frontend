import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";

export default class Column extends Component {

    render() {
        let {direction, reverse = false, justify,alignItems,...props} = this.props;

        direction = reverse ? "column-reverse" : "column";


        let view ;

        if(justify === undefined){
            view = <Grid item  {...props}/>
        }else view= <Grid container justify={justify} item  {...props}/>

        return view;
    }
}