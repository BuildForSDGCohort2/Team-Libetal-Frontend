import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

export default class GridItem extends Component {

    static propTypes = {
        padding: PropTypes.number,
        paddingRight: PropTypes.number,
        paddingLeft: PropTypes.number,
        paddingTop: PropTypes.number,
        paddingBottom: PropTypes.number,
        marginRight: PropTypes.number,
        paddingLR: PropTypes.number,
        paddingTB: PropTypes.number,
        flexGrow: PropTypes.number,
        backgroundColor:PropTypes.string,
    };

    render() {
        let {
            padding,
            backgroundColor,
            marginRight,
            paddingLR = padding,
            paddingTB = padding,
            paddingTop = paddingTB,
            paddingBottom = paddingTB,
            paddingLeft = paddingLR,
            paddingRight = paddingLR,
            flexGrow,
            style: {...style} = {},
            ...props
        } = this.props;

        style.paddingRight = paddingRight;
        style.paddingLeft = paddingLeft;
        style.paddingTop = paddingTop;
        style.paddingBottom = paddingBottom;
        style.marginRight = marginRight;
        style.backgroundColor = backgroundColor;


        style.flexGrow = flexGrow || style.flexGrow;
        return (
            <Grid
                style={style}
                item
                {...props}/>
        );
    }
}