import React, {Component} from "react";
import MaterialGrid from "./MaterialGrid";
import MaterialRow from "./grid/MaterialRow";

export default class MaterialInputLayout extends Component {


    render() {

        // TODO padding should be height of the input label
        let style = {
            paddingTop: 4
        };

        if (this.props.style !== undefined) {
            style = {...this.props.style, style};
        }

        return (
            <MaterialRow {...this.props} style={style}>
                {this.props.children}
            </MaterialRow>
        );
    }

}