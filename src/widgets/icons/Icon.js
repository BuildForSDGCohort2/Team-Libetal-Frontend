import React, {Component} from "react";
import PropTypes from "prop-types";
import SvgIcon from "@material-ui/core/SvgIcon";
import Colors from "../../Colors";

export default class Icon extends Component{

    static propTypes = {
        height: PropTypes.number,
        width: PropTypes.number,
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
        lColor: PropTypes.string,
        iColor: PropTypes.string,
        bColor: PropTypes.string,
        BColor: PropTypes.string,
        onClick: PropTypes.func
    };

    get paths(){
        console.log(`Implement paths form ${this}`);
    }

    render() {

        let {
            props: {
                style: {
                    width: sWidth,
                    height: sHeight
                } = {},
                height = sWidth || 80,
                width = sHeight || 80,
                color = Colors.orange,
                backgroundColor = Colors.purple,
                lColor = color,
                iColor = color,
                bColor = color,
                BColor = color,
                viewBox,
                onClick,
                ...props
            }

        } = this;

        return(
            <SvgIcon style={{height, width}} onClick={onClick} viewBox={viewBox}>
                {this.paths}
            </SvgIcon>
        )
    }
}