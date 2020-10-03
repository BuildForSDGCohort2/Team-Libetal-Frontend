import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Flex from "./Flex";
import PropTypes from "prop-types";

export default class Column extends Component {

    static defaultProps ={
        style:{}
    }

    static propTypes = {
        alignContent: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_BETWEEN, Flex.SPACE_AROUND]),
        justify: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_BETWEEN, Flex.SPACE_AROUND]),
        alignItems: PropTypes.oneOf([Flex.CENTER, Flex.START, Flex.END, Flex.SPACE_BETWEEN, Flex.SPACE_AROUND]),
        flexGrow:PropTypes.number,
    };

    render() {
        let {direction, reverse = false, justify, alignItems, alignContent, flexGrow,style:{flexGrow:sFlexGrow,...style},...props} = this.props;



        let view;

        if(flexGrow!== undefined){
            style.flexGrow = flexGrow
        }

        if(direction !== undefined){

            direction = reverse ? "column-reverse" : "column";

            if (justify === undefined && alignItems === undefined && alignContent === undefined) {
                view = <Grid item style={style} direction={direction} {...props} />;
            } else view = <Grid container direction={direction} item justify={justify} alignContent={alignContent} alignItems={alignItems} style={style} {...props}/>;

        }else{

            if (justify === undefined && alignItems === undefined && alignContent === undefined) {
                view = <Grid item style={style} {...props} />;
            } else view = <Grid container  item justify={justify} alignContent={alignContent} alignItems={alignItems} style={style} {...props}/>;

        }

        return view;
    }
}